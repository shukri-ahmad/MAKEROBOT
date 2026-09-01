/**
 * MakeRobot
 */
enum MakeRobotMove {
    //% block="left"
    Left,
    //% block="right"
    Right
}

enum MakeRobotLineFollowUntil {
    //% block="cross"
    Cross,
    //% block="obstacle"
    Obstacle
}

enum MakeRobotLinePin {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

enum MakeRobotCalibrationPin {
    //% block="P9"
    P9,
    //% block="P12"
    P12,
    //% block="P13"
    P13,
    //% block="P14"
    P14,
    //% block="P15"
    P15,
    //% block="P16"
    P16
}

enum MakeRobotMakerLinePin {
    //% block="P12"
    P12,
    //% block="P13"
    P13,
    //% block="P14"
    P14,
    //% block="P15"
    P15,
    //% block="P16"
    P16
}

enum MakeRobotLineSignal {
    //% block="off"
    Off,
    //% block="on"
    On,
    //% block="any"
    Any
}

enum MakeRobotUltrasonicPin {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2,
    //% block="P9"
    P9,
    //% block="P12"
    P12,
    //% block="P13"
    P13,
    //% block="P14"
    P14,
    //% block="P15"
    P15,
    //% block="P16"
    P16
}

enum MakeRobotTurnDirection {
    //% block="left"
    Left,
    //% block="right"
    Right
}

//% color=#3455db icon="\uf1b9"
//% block="MakeRobot"
//% subcategories=["Tracer Junior", "Tracer Senior", "Tracer Expert"]
//% groups=["Setup", "Movement", "Sensors"]
namespace MakeRobot {
    let lastError = 0
    let integral = 0
    let pidSetpoint = 500
    let pidKp = 0.6
    let pidKd = 0.4
    let pidKi = 0
    let leftMotorChannel = MotionBitMotorChannel.M1
    let rightMotorChannel = MotionBitMotorChannel.M3
    let makerLineD1 = DigitalPin.P16
    let makerLineD2 = DigitalPin.P15
    let makerLineD3 = DigitalPin.P14
    let makerLineD4 = DigitalPin.P13
    let makerLineD5 = DigitalPin.P12
    let ultrasonicTrigPin = DigitalPin.P1
    let ultrasonicEchoPin = DigitalPin.P2
    let ultrasonicDistance = 255
    let ultrasonicEnabled = false
    let ultrasonicDivisor = control.hardwareVersion() == "1" ? 39 : 58

    control.inBackground(function () {
        while (true) {
            if (ultrasonicEnabled) {
                readUltrasonicNow()

                basic.pause(200)
            } else {
                basic.pause(50)
            }
        }
    })

    /**
     * Calibrate the robot line sensor using default settings.
     */
    //% block="robot calibration"
    //% group="Setup"
    //% weight=100
    //% subcategory="Tracer Junior"
    export function juniorRobotCalibration(): void {
        robotCalibration(MakeRobotCalibrationPin.P9, 120)
    }

    /**
     * Follow the line until the robot reaches a cross or obstacle.
     */
    //% block="robot line follow until %until"
    //% until.defl=MakeRobotLineFollowUntil.Cross
    //% group="Movement"
    //% weight=90
    //% subcategory="Tracer Junior"
    export function robotLineFollowUntil(until: MakeRobotLineFollowUntil): void {
        setPidTuning(500, 0.6, 0.4, 0)

        if (until == MakeRobotLineFollowUntil.Obstacle) {
            lineFollowUntilObstacleWithPin(AnalogReadWritePin.P0, 150, 10)
        } else {
            lineFollowWithPin(AnalogReadWritePin.P0, 150, true, 500)
        }
    }

    /**
     * Go left or right from the current line position.
     */
    //% block="robot turn %move"
    //% move.defl=MakeRobotMove.Left
    //% group="Movement"
    //% weight=80
    //% subcategory="Tracer Junior"
    export function robotTurn(move: MakeRobotMove): void {
        if (move == MakeRobotMove.Right) {
            turnToLineWithPin(MakeRobotTurnDirection.Right, 150, AnalogReadWritePin.P0)
        } else if (move == MakeRobotMove.Left) {
            turnToLineWithPin(MakeRobotTurnDirection.Left, 150, AnalogReadWritePin.P0)
        }
    }

    /**
     * Calibrate the robot line sensor.
     */
    //% block="robot calibration pin %pin speed %speed"
    //% pin.defl=MakeRobotCalibrationPin.P9
    //% speed.min=0 speed.max=255 speed.defl=120
    //% group="Setup"
    //% weight=70
    //% subcategory="Tracer Senior"
    export function robotCalibration(pin: MakeRobotCalibrationPin, speed: number): void {
        const motorSpeed = limit(speed, 0, 255)
        const calibrationPin = calibrationPinValue(pin)

        enterCalibration(calibrationPin)
        runMotorSigned(leftMotorChannel, -motorSpeed)
        runMotorSigned(rightMotorChannel, motorSpeed)
        basic.pause(1000)
        runMotorSigned(leftMotorChannel, motorSpeed)
        runMotorSigned(rightMotorChannel, -motorSpeed)
        basic.pause(2000)
        runMotorSigned(leftMotorChannel, -motorSpeed)
        runMotorSigned(rightMotorChannel, motorSpeed)
        basic.pause(1000)
        robotStop()
        exitCalibration(calibrationPin)
    }

    /**
     * Set the left and right motor channels.
     */
    //% block="set motor left %left right %right"
    //% left.defl=MotionBitMotorChannel.M1
    //% right.defl=MotionBitMotorChannel.M3
    //% group="Setup"
    //% weight=100
    //% subcategory="Tracer Senior"
    export function setMotor(left: MotionBitMotorChannel, right: MotionBitMotorChannel): void {
        leftMotorChannel = left
        rightMotorChannel = right
    }

    /**
     * Set left and right motor speed directly.
     */
    //% block="set motors speed left %leftSpeed right %rightSpeed delay %delay"
    //% leftSpeed.min=-255 leftSpeed.max=255 leftSpeed.defl=0
    //% rightSpeed.min=-255 rightSpeed.max=255 rightSpeed.defl=0
    //% delay.min=0 delay.defl=0
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=80
    //% subcategory="Tracer Senior"
    export function setMotorsSpeed(leftSpeed: number, rightSpeed: number, delay: number): void {
        runMotorSigned(leftMotorChannel, leftSpeed)
        runMotorSigned(rightMotorChannel, rightSpeed)

        if (delay > 0) {
            basic.pause(delay)
            robotStop()
        }
    }

    /**
     * Set Maker Line digital pins D1 to D5.
     */
    //% block="set maker line D1 %d1 D2 %d2 D3 %d3 D4 %d4 D5 %d5"
    //% d1.defl=MakeRobotMakerLinePin.P16
    //% d2.defl=MakeRobotMakerLinePin.P15
    //% d3.defl=MakeRobotMakerLinePin.P14
    //% d4.defl=MakeRobotMakerLinePin.P13
    //% d5.defl=MakeRobotMakerLinePin.P12
    //% inlineInputMode=inline
    //% group="Setup"
    //% weight=90
    //% subcategory="Tracer Senior"
    export function setMakerLine(d1: MakeRobotMakerLinePin, d2: MakeRobotMakerLinePin, d3: MakeRobotMakerLinePin, d4: MakeRobotMakerLinePin, d5: MakeRobotMakerLinePin): void {
        makerLineD1 = makerLinePinValue(d1)
        makerLineD2 = makerLinePinValue(d2)
        makerLineD3 = makerLinePinValue(d3)
        makerLineD4 = makerLinePinValue(d4)
        makerLineD5 = makerLinePinValue(d5)
    }

    /**
     * Check whether Maker Line sensor signals match the selected pattern.
     */
    //% block="line detected on S1 %s1 S2 %s2 S3 %s3 S4 %s4 S5 %s5"
    //% s1.defl=MakeRobotLineSignal.Off
    //% s2.defl=MakeRobotLineSignal.Off
    //% s3.defl=MakeRobotLineSignal.On
    //% s4.defl=MakeRobotLineSignal.Off
    //% s5.defl=MakeRobotLineSignal.Off
    //% inlineInputMode=inline
    //% group="Sensors"
    //% weight=70
    //% subcategory="Tracer Senior"
    export function lineDetectedOn(s1: MakeRobotLineSignal, s2: MakeRobotLineSignal, s3: MakeRobotLineSignal, s4: MakeRobotLineSignal, s5: MakeRobotLineSignal): boolean {
        return makerLineSignalMatches(makerLineD1, s1)
            && makerLineSignalMatches(makerLineD2, s2)
            && makerLineSignalMatches(makerLineD3, s3)
            && makerLineSignalMatches(makerLineD4, s4)
            && makerLineSignalMatches(makerLineD5, s5)
    }

    /**
     * Set ultrasonic sensor trigger and echo pins.
     */
    //% block="set ultrasonic Trig %trig Echo %echo"
    //% trig.defl=MakeRobotUltrasonicPin.P1
    //% echo.defl=MakeRobotUltrasonicPin.P2
    //% inlineInputMode=inline
    //% group="Setup"
    //% weight=80
    //% subcategory="Tracer Senior"
    export function setUltrasonic(trig: MakeRobotUltrasonicPin, echo: MakeRobotUltrasonicPin): void {
        ultrasonicTrigPin = ultrasonicPinValue(trig)
        ultrasonicEchoPin = ultrasonicPinValue(echo)
    }

    /**
     * Return distance measured by ultrasonic sensor in centimeters.
     */
    //% block="ultrasonic distance (cm)"
    //% group="Sensors"
    //% weight=60
    //% subcategory="Tracer Senior"
    export function readUltrasonic(): number {
        ultrasonicEnabled = true
        readUltrasonicNow()
        return ultrasonicDistance
    }

    /**
     * Set the PID tuning values.
     */
    //% block="set PID tuning setpoint %setpoint kp %kp kd %kd ki %ki"
    //% setpoint.defl=500
    //% kp.defl=0.6
    //% kd.defl=0.4
    //% ki.defl=0
    //% inlineInputMode=inline
    //% group="Setup"
    //% weight=100
    //% subcategory="Tracer Expert"
    //% blockHidden=true
    export function setPidTuning(setpoint: number, kp: number, kd: number, ki: number): void {
        pidSetpoint = limit(setpoint, 0, 1023)
        pidKp = kp
        pidKd = kd
        pidKi = ki
        resetPid()
    }

    /**
     * Follow a line until a cross or timer condition.
     */
    //% block="robot line follow pin %pin speed %speed cross %cross timer to stop %stopTimer"
    //% pin.defl=MakeRobotLinePin.P0
    //% speed.min=0 speed.max=255 speed.defl=150
    //% cross.shadow="toggleOnOff"
    //% cross.defl=true
    //% stopTimer.min=0 stopTimer.defl=0
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=90
    //% subcategory="Tracer Expert"
    //% blockHidden=true
    export function robotLineFollow(pin: MakeRobotLinePin, speed: number, cross: boolean, stopTimer: number): void {
        lineFollowWithPin(linePinValue(pin), speed, cross, stopTimer)
    }

    /**
     * Turn until the robot finds the line again.
     */
    //% block="robot turn to line %direction speed %speed pin %pin"
    //% direction.defl=MakeRobotTurnDirection.Left
    //% speed.min=0 speed.max=255 speed.defl=150
    //% pin.defl=MakeRobotLinePin.P0
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=80
    //% subcategory="Tracer Expert"
    //% blockHidden=true
    export function robotTurnToLine(direction: MakeRobotTurnDirection, speed: number, pin: MakeRobotLinePin): void {
        turnToLineWithPin(direction, speed, linePinValue(pin))
    }

    /**
     * Stop the robot.
     */
    //% block="robot stop"
    //% group="Movement"
    //% weight=70
    //% subcategory="Tracer Expert"
    //% blockHidden=true
    export function robotStop(): void {
        motionbit.brakeMotor(leftMotorChannel)
        motionbit.brakeMotor(rightMotorChannel)
    }

    function lineFollowWithPin(pin: AnalogReadWritePin, speed: number, cross: boolean, stopTimer: number): void {
        const baseSpeed = limit(speed, 0, 255)
        let speedLeft = baseSpeed
        let speedRight = baseSpeed
        let crossFound = false
        let endTime = 0
        let timerEndTime = 0

        resetPid()

        if (!cross && stopTimer > 0) {
            timerEndTime = input.runningTime() + stopTimer
        }

        while (true) {
            const adc = pins.analogReadPin(pin)

            if (!cross && timerEndTime > 0 && input.runningTime() >= timerEndTime) {
                break
            }

            if (adc > 941 && cross) {
                if (stopTimer <= 0) {
                    break
                }

                if (!crossFound) {
                    crossFound = true
                    endTime = input.runningTime() + stopTimer
                }
            }

            if (crossFound && input.runningTime() >= endTime) {
                break
            }

            if (adc < 81) {
                if (lastError < 0) {
                    speedLeft = 0
                    speedRight = baseSpeed
                } else {
                    speedLeft = baseSpeed
                    speedRight = 0
                }
            } else if (adc > 941) {
                speedLeft = baseSpeed
                speedRight = baseSpeed
            } else {
                const powerDiff = limit(pidPowerDiff(adc), -baseSpeed, baseSpeed)

                if (powerDiff < 0) {
                    speedLeft = baseSpeed + powerDiff
                    speedRight = baseSpeed
                } else {
                    speedLeft = baseSpeed
                    speedRight = baseSpeed - powerDiff
                }
            }

            runLineMotors(speedLeft, speedRight)
            basic.pause(5)
        }

        robotStop()
    }

    function lineFollowUntilObstacleWithPin(pin: AnalogReadWritePin, speed: number, obstacleDistance: number): void {
        const baseSpeed = limit(speed, 0, 255)
        let speedLeft = baseSpeed
        let speedRight = baseSpeed

        resetPid()
        readUltrasonic()

        while (true) {
            if (ultrasonicDistance <= obstacleDistance) {
                break
            }

            const adc = pins.analogReadPin(pin)

            if (adc < 81) {
                if (lastError < 0) {
                    speedLeft = 0
                    speedRight = baseSpeed
                } else {
                    speedLeft = baseSpeed
                    speedRight = 0
                }
            } else if (adc > 941) {
                speedLeft = baseSpeed
                speedRight = baseSpeed
            } else {
                const powerDiff = limit(pidPowerDiff(adc), -baseSpeed, baseSpeed)

                if (powerDiff < 0) {
                    speedLeft = baseSpeed + powerDiff
                    speedRight = baseSpeed
                } else {
                    speedLeft = baseSpeed
                    speedRight = baseSpeed - powerDiff
                }
            }

            runLineMotors(speedLeft, speedRight)
            basic.pause(5)
        }

        robotStop()
    }

    function turnToLineWithPin(direction: MakeRobotTurnDirection, speed: number, pin: AnalogReadWritePin): void {
        const motorSpeed = limit(speed, 0, 255)

        if (direction == MakeRobotTurnDirection.Left) {
            runMotorSigned(leftMotorChannel, -motorSpeed)
            runMotorSigned(rightMotorChannel, motorSpeed)
        } else {
            runMotorSigned(leftMotorChannel, motorSpeed)
            runMotorSigned(rightMotorChannel, -motorSpeed)
        }

        while (pins.analogReadPin(pin) >= 81) {
            basic.pause(5)
        }

        basic.pause(200)

        while (pins.analogReadPin(pin) < 81) {
            basic.pause(5)
        }

        robotStop()
    }

    function pidPowerDiff(adc: number): number {
        const error = adc - pidSetpoint
        const derivative = error - lastError

        integral += error
        lastError = error

        return error * pidKp + derivative * pidKd + integral * pidKi
    }

    function runLineMotors(speedLeft: number, speedRight: number): void {
        runMotorSigned(leftMotorChannel, limit(speedLeft, 0, 255))
        runMotorSigned(rightMotorChannel, limit(speedRight, 0, 255))
    }

    function runMotorSigned(channel: MotionBitMotorChannel, speed: number): void {
        const motorSpeed = limit(Math.abs(speed), 0, 255)

        if (speed >= 0) {
            motionbit.runMotor(channel, MotionBitMotorDirection.Forward, motorSpeed)
        } else {
            motionbit.runMotor(channel, MotionBitMotorDirection.Backward, motorSpeed)
        }
    }

    function enterCalibration(pin: DigitalPin): void {
        pins.digitalWritePin(pin, 0)
        basic.pause(2100)
        pins.digitalWritePin(pin, 1)
    }

    function exitCalibration(pin: DigitalPin): void {
        pins.digitalWritePin(pin, 0)
        basic.pause(100)
        pins.digitalWritePin(pin, 1)
    }

    function readUltrasonicNow(): void {
        pins.digitalWritePin(ultrasonicTrigPin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(ultrasonicTrigPin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(ultrasonicTrigPin, 0)

        const pulse = pins.pulseIn(ultrasonicEchoPin, PulseValue.High, 255 * ultrasonicDivisor + 20000)

        if (pulse == 0) {
            ultrasonicDistance = 255
        } else {
            ultrasonicDistance = Math.idiv(pulse, ultrasonicDivisor)
        }
    }

    function linePinValue(pin: MakeRobotLinePin): AnalogReadWritePin {
        if (pin == MakeRobotLinePin.P1) {
            return AnalogReadWritePin.P1
        } else if (pin == MakeRobotLinePin.P2) {
            return AnalogReadWritePin.P2
        } else {
            return AnalogReadWritePin.P0
        }
    }

    function ultrasonicPinValue(pin: MakeRobotUltrasonicPin): DigitalPin {
        if (pin == MakeRobotUltrasonicPin.P1) {
            return DigitalPin.P1
        } else if (pin == MakeRobotUltrasonicPin.P2) {
            return DigitalPin.P2
        } else if (pin == MakeRobotUltrasonicPin.P9) {
            return DigitalPin.P9
        } else if (pin == MakeRobotUltrasonicPin.P12) {
            return DigitalPin.P12
        } else if (pin == MakeRobotUltrasonicPin.P13) {
            return DigitalPin.P13
        } else if (pin == MakeRobotUltrasonicPin.P14) {
            return DigitalPin.P14
        } else if (pin == MakeRobotUltrasonicPin.P15) {
            return DigitalPin.P15
        } else if (pin == MakeRobotUltrasonicPin.P16) {
            return DigitalPin.P16
        } else {
            return DigitalPin.P0
        }
    }

    function makerLinePinValue(pin: MakeRobotMakerLinePin): DigitalPin {
        if (pin == MakeRobotMakerLinePin.P13) {
            return DigitalPin.P13
        } else if (pin == MakeRobotMakerLinePin.P14) {
            return DigitalPin.P14
        } else if (pin == MakeRobotMakerLinePin.P15) {
            return DigitalPin.P15
        } else if (pin == MakeRobotMakerLinePin.P16) {
            return DigitalPin.P16
        } else {
            return DigitalPin.P12
        }
    }

    function makerLineDetected(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1
    }

    function makerLineSignalMatches(pin: DigitalPin, signal: MakeRobotLineSignal): boolean {
        if (signal == MakeRobotLineSignal.Any) {
            return true
        }

        return makerLineDetected(pin) == (signal == MakeRobotLineSignal.On)
    }

    function calibrationPinValue(pin: MakeRobotCalibrationPin): DigitalPin {
        if (pin == MakeRobotCalibrationPin.P12) {
            return DigitalPin.P12
        } else if (pin == MakeRobotCalibrationPin.P13) {
            return DigitalPin.P13
        } else if (pin == MakeRobotCalibrationPin.P14) {
            return DigitalPin.P14
        } else if (pin == MakeRobotCalibrationPin.P15) {
            return DigitalPin.P15
        } else if (pin == MakeRobotCalibrationPin.P16) {
            return DigitalPin.P16
        } else {
            return DigitalPin.P9
        }
    }

    function resetPid(): void {
        lastError = 0
        integral = 0
    }

    function limit(value: number, min: number, max: number): number {
        if (value < min) {
            return min
        }

        if (value > max) {
            return max
        }

        return value
    }
}
