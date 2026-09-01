/**
 * MAKEROBOT
 */
enum MAKEROBOTMove {
    //% block="left"
    Left,
    //% block="right"
    Right
}

enum MAKEROBOTLineFollowUntil {
    //% block="cross"
    Cross,
    //% block="obstacle"
    Obstacle
}

enum MAKEROBOTLinePin {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

enum MAKEROBOTCalibrationPin {
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

enum MAKEROBOTMakerLinePin {
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

enum MAKEROBOTLineSignal {
    //% block="off"
    Off,
    //% block="on"
    On,
    //% block="any"
    Any
}

enum MAKEROBOTUltrasonicPin {
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

enum MAKEROBOTTurnDirection {
    //% block="left"
    Left,
    //% block="right"
    Right
}

//% color=#3455db icon="\uf1b9"
//% block="MAKEROBOT"
//% subcategories=["Tracer Junior", "Tracer Senior", "Tracer Expert"]
//% groups=["Setup", "Movement", "Sensors"]
namespace MAKEROBOT {
    let lastError = 0
    let integral = 0
    let pidSetpoint = 500
    let pidKp = 0.6
    let pidKd = 0.4
    let pidKi = 0
    
    // Left side controls M1 & M2
    let leftMotorChannel1 = MotionBitMotorChannel.M1
    let leftMotorChannel2 = MotionBitMotorChannel.M2
    
    // Right side controls M3 & M4
    let rightMotorChannel1 = MotionBitMotorChannel.M3
    let rightMotorChannel2 = MotionBitMotorChannel.M4
    
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
    //% block="robot calibration || speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=120
    //% group="Setup"
    //% weight=100
    //% subcategory="Tracer Junior"
    //% expandableArgumentMode="toggle"
    export function juniorRobotCalibration(speed: number = 120): void {
        robotCalibration(MAKEROBOTCalibrationPin.P9, speed)
    }

    /**
     * Follow the line until the robot reaches a cross or obstacle.
     */
    //% block="robot line follow until %until || speed %speed"
    //% until.defl=MAKEROBOTLineFollowUntil.Cross
    //% speed.min=0 speed.max=255 speed.defl=150
    //% group="Movement"
    //% weight=90
    //% subcategory="Tracer Junior"
    //% expandableArgumentMode="toggle"
    export function robotLineFollowUntil(until: MAKEROBOTLineFollowUntil, speed: number = 150): void {
        setPidTuning(500, 0.6, 0.4, 0)

        if (until == MAKEROBOTLineFollowUntil.Obstacle) {
            lineFollowUntilObstacleWithPin(AnalogReadWritePin.P0, speed, 10)
        } else {
            lineFollowWithPin(AnalogReadWritePin.P0, speed, true, 500)
        }
    }

    /**
     * Go left or right from the current line position.
     */
    //% block="robot turn %move || speed %speed"
    //% move.defl=MAKEROBOTMove.Left
    //% speed.min=0 speed.max=255 speed.defl=150
    //% group="Movement"
    //% weight=80
    //% subcategory="Tracer Junior"
    //% expandableArgumentMode="toggle"
    export function robotTurn(move: MAKEROBOTMove, speed: number = 150): void {
        if (move == MAKEROBOTMove.Right) {
            turnToLineWithPin(MAKEROBOTTurnDirection.Right, speed, AnalogReadWritePin.P0)
        } else if (move == MAKEROBOTMove.Left) {
            turnToLineWithPin(MAKEROBOTTurnDirection.Left, speed, AnalogReadWritePin.P0)
        }
    }

    /**
     * Calibrate the robot line sensor.
     */
    //% block="robot calibration pin %pin speed %speed"
    //% pin.defl=MAKEROBOTCalibrationPin.P9
    //% speed.min=0 speed.max=255 speed.defl=120
    //% group="Setup"
    //% weight=70
    //% subcategory="Tracer Senior"
    export function robotCalibration(pin: MAKEROBOTCalibrationPin, speed: number): void {
        const motorSpeed = limit(speed, 0, 255)
        const calibrationPin = calibrationPinValue(pin)

        enterCalibration(calibrationPin)
        runMotorSignedLeft(-motorSpeed)
        runMotorSignedRight(motorSpeed)
        basic.pause(1000)
        runMotorSignedLeft(motorSpeed)
        runMotorSignedRight(-motorSpeed)
        basic.pause(2000)
        runMotorSignedLeft(-motorSpeed)
        runMotorSignedRight(motorSpeed)
        basic.pause(1000)
        robotStop()
        exitCalibration(calibrationPin)
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
        runMotorSignedLeft(leftSpeed)
        runMotorSignedRight(rightSpeed)

        if (delay > 0) {
            basic.pause(delay)
            robotStop()
        }
    }

    /**
     * Set Maker Line digital pins D1 to D5.
     */
    //% block="set maker line D1 %d1 D2 %d2 D3 %d3 D4 %d4 D5 %d5"
    //% d1.defl=MAKEROBOTMakerLinePin.P16
    //% d2.defl=MAKEROBOTMakerLinePin.P15
    //% d3.defl=MAKEROBOTMakerLinePin.P14
    //% d4.defl=MAKEROBOTMakerLinePin.P13
    //% d5.defl=MAKEROBOTMakerLinePin.P12
    //% inlineInputMode=inline
    //% group="Setup"
    //% weight=90
    //% subcategory="Tracer Senior"
    export function setMakerLine(d1: MAKEROBOTMakerLinePin, d2: MAKEROBOTMakerLinePin, d3: MAKEROBOTMakerLinePin, d4: MAKEROBOTMakerLinePin, d5: MAKEROBOTMakerLinePin): void {
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
    //% s1.defl=MAKEROBOTLineSignal.Off
    //% s2.defl=MAKEROBOTLineSignal.Off
    //% s3.defl=MAKEROBOTLineSignal.On
    //% s4.defl=MAKEROBOTLineSignal.Off
    //% s5.defl=MAKEROBOTLineSignal.Off
    //% inlineInputMode=inline
    //% group="Sensors"
    //% weight=70
    //% subcategory="Tracer Senior"
    export function lineDetectedOn(s1: MAKEROBOTLineSignal, s2: MAKEROBOTLineSignal, s3: MAKEROBOTLineSignal, s4: MAKEROBOTLineSignal, s5: MAKEROBOTLineSignal): boolean {
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
    //% trig.defl=MAKEROBOTUltrasonicPin.P1
    //% echo.defl=MAKEROBOTUltrasonicPin.P2
    //% inlineInputMode=inline
    //% group="Setup"
    //% weight=80
    //% subcategory="Tracer Senior"
    export function setUltrasonic(trig: MAKEROBOTUltrasonicPin, echo: MAKEROBOTUltrasonicPin): void {
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
    //% pin.defl=MAKEROBOTLinePin.P0
    //% speed.min=0 speed.max=255 speed.defl=150
    //% cross.shadow="toggleOnOff"
    //% cross.defl=true
    //% stopTimer.min=0 stopTimer.defl=0
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=90
    //% subcategory="Tracer Expert"
    //% blockHidden=true
    export function robotLineFollow(pin: MAKEROBOTLinePin, speed: number, cross: boolean, stopTimer: number): void {
        lineFollowWithPin(linePinValue(pin), speed, cross, stopTimer)
    }

    /**
     * Turn until the robot finds the line again.
     */
    //% block="robot turn to line %direction speed %speed pin %pin"
    //% direction.defl=MAKEROBOTTurnDirection.Left
    //% speed.min=0 speed.max=255 speed.defl=150
    //% pin.defl=MAKEROBOTLinePin.P0
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=80
    //% subcategory="Tracer Expert"
    //% blockHidden=true
    export function robotTurnToLine(direction: MAKEROBOTTurnDirection, speed: number, pin: MAKEROBOTLinePin): void {
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
        motionbit.brakeMotor(leftMotorChannel1)
        motionbit.brakeMotor(leftMotorChannel2)
        motionbit.brakeMotor(rightMotorChannel1)
        motionbit.brakeMotor(rightMotorChannel2)
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

    function turnToLineWithPin(direction: MAKEROBOTTurnDirection, speed: number, pin: AnalogReadWritePin): void {
        const motorSpeed = limit(speed, 0, 255)

        if (direction == MAKEROBOTTurnDirection.Left) {
            runMotorSignedLeft(-motorSpeed)
            runMotorSignedRight(motorSpeed)
        } else {
            runMotorSignedLeft(motorSpeed)
            runMotorSignedRight(-motorSpeed)
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
        runMotorSignedLeft(limit(speedLeft, 0, 255))
        runMotorSignedRight(limit(speedRight, 0, 255))
    }

    function runMotorSignedLeft(speed: number): void {
        const motorSpeed = limit(Math.abs(speed), 0, 255)

        if (speed >= 0) {
            motionbit.runMotor(leftMotorChannel1, MotionBitMotorDirection.Forward, motorSpeed)
            motionbit.runMotor(leftMotorChannel2, MotionBitMotorDirection.Forward, motorSpeed)
        } else {
            motionbit.runMotor(leftMotorChannel1, MotionBitMotorDirection.Backward, motorSpeed)
            motionbit.runMotor(leftMotorChannel2, MotionBitMotorDirection.Backward, motorSpeed)
        }
    }

    function runMotorSignedRight(speed: number): void {
        const motorSpeed = limit(Math.abs(speed), 0, 255)

        if (speed >= 0) {
            motionbit.runMotor(rightMotorChannel1, MotionBitMotorDirection.Forward, motorSpeed)
            motionbit.runMotor(rightMotorChannel2, MotionBitMotorDirection.Forward, motorSpeed)
        } else {
            motionbit.runMotor(rightMotorChannel1, MotionBitMotorDirection.Backward, motorSpeed)
            motionbit.runMotor(rightMotorChannel2, MotionBitMotorDirection.Backward, motorSpeed)
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

    function linePinValue(pin: MAKEROBOTLinePin): AnalogReadWritePin {
        if (pin == MAKEROBOTLinePin.P1) {
            return AnalogReadWritePin.P1
        } else if (pin == MAKEROBOTLinePin.P2) {
            return AnalogReadWritePin.P2
        } else {
            return AnalogReadWritePin.P0
        }
    }

    function ultrasonicPinValue(pin: MAKEROBOTUltrasonicPin): DigitalPin {
        if (pin == MAKEROBOTUltrasonicPin.P1) {
            return DigitalPin.P1
        } else if (pin == MAKEROBOTUltrasonicPin.P2) {
            return DigitalPin.P2
        } else if (pin == MAKEROBOTUltrasonicPin.P9) {
            return DigitalPin.P9
        } else if (pin == MAKEROBOTUltrasonicPin.P12) {
            return DigitalPin.P12
        } else if (pin == MAKEROBOTUltrasonicPin.P13) {
            return DigitalPin.P13
        } else if (pin == MAKEROBOTUltrasonicPin.P14) {
            return DigitalPin.P14
        } else if (pin == MAKEROBOTUltrasonicPin.P15) {
            return DigitalPin.P15
        } else if (pin == MAKEROBOTUltrasonicPin.P16) {
            return DigitalPin.P16
        } else {
            return DigitalPin.P0
        }
    }

    function makerLinePinValue(pin: MAKEROBOTMakerLinePin): DigitalPin {
        if (pin == MAKEROBOTMakerLinePin.P13) {
            return DigitalPin.P13
        } else if (pin == MAKEROBOTMakerLinePin.P14) {
            return DigitalPin.P14
        } else if (pin == MAKEROBOTMakerLinePin.P15) {
            return DigitalPin.P15
        } else if (pin == MAKEROBOTMakerLinePin.P16) {
            return DigitalPin.P16
        } else {
            return DigitalPin.P12
        }
    }

    function makerLineDetected(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1
    }

    function makerLineSignalMatches(pin: DigitalPin, signal: MAKEROBOTLineSignal): boolean {
        if (signal == MAKEROBOTLineSignal.Any) {
            return true
        }

        return makerLineDetected(pin) == (signal == MAKEROBOTLineSignal.On)
    }

    function calibrationPinValue(pin: MAKEROBOTCalibrationPin): DigitalPin {
        if (pin == MAKEROBOTCalibrationPin.P12) {
            return DigitalPin.P12
        } else if (pin == MAKEROBOTCalibrationPin.P13) {
            return DigitalPin.P13
        } else if (pin == MAKEROBOTCalibrationPin.P14) {
            return DigitalPin.P14
        } else if (pin == MAKEROBOTCalibrationPin.P15) {
            return DigitalPin.P15
        } else if (pin == MAKEROBOTCalibrationPin.P16) {
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
