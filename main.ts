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

// --- NEW REMOTE ENUMS ---
enum MAKEROBOTRemoteButton {
    //% block="B1"
    B1,
    //% block="B2"
    B2,
    //% block="B3"
    B3,
    //% block="B4"
    B4
}

enum MAKEROBOTButtonState {
    //% block="pressed"
    Press = 0,
    //% block="released"
    Release = 1
}

enum MAKEROBOTRocker {
    //% block="none"
    None,
    //% block="up"
    Up,
    //% block="down"
    Down,
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="up-left"
    UpLeft,
    //% block="up-right"
    UpRight,
    //% block="down-left"
    DownLeft,
    //% block="down-right"
    DownRight,
    //% block="pressed"
    Press
}

enum MAKEROBOTAxis {
    //% block="pitch"
    Pitch,
    //% block="roll"
    Roll
}

enum MAKEROBOTGyroDirection {
    //% block="pitch forward"
    PitchForward,
    //% block="pitch backward"
    PitchBackward,
    //% block="roll left"
    RollLeft,
    //% block="roll right"
    RollRight
}

// --- NEW BLITZ ROBOT ENUMS ---
enum BLITZMove {
    //% block="forward"
    Forward,
    //% block="backward"
    Backward,
    //% block="turn left"
    TurnLeft,
    //% block="turn right"
    TurnRight
}

enum BLITZDirection {
    //% block="forward"
    Forward,
    //% block="backward"
    Backward
}

enum BLITZCorner {
    //% block="left"
    Left,
    //% block="right"
    Right
}

enum BLITZMecanum {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="forward-left"
    ForwardLeft,
    //% block="forward-right"
    ForwardRight,
    //% block="backward-left"
    BackwardLeft,
    //% block="backward-right"
    BackwardRight
}


//% color=#3455db icon="\uf1b9"
//% block="MAKEROBOT"
//% subcategories=["TRACER Junior", "TRACER Senior", "TRACER Expert", "BLITZ Remote", "BLITZ Robot"]
//% groups=["Setup", "Movement", "Sensors", "Mecanum"]
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
    
    // Robot Alignment (Trim)
    let robotTrim = 0

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

    // ==========================================
    // TRACER JUNIOR BLOCKS
    // ==========================================

    /**
     * Calibrate the robot line sensor using default settings.
     * In JS: juniorRobotCalibration(speed)
     */
    //% block="robot calibration"
    //% subcategory="TRACER Junior"
    //% group="Setup"
    //% weight=100
    export function juniorRobotCalibration(speed: number = 120): void {
        robotCalibration(MAKEROBOTCalibrationPin.P9, speed)
    }

    /**
     * Follow the line until the robot reaches a cross or obstacle.
     * In JS: robotLineFollowUntil(until, speed, stopDelay)
     */
    //% block="robot line follow until %until"
    //% subcategory="TRACER Junior"
    //% group="Movement"
    //% weight=90
    export function robotLineFollowUntil(until: MAKEROBOTLineFollowUntil, speed: number = 150, stopDelay: number = 0): void {
        setPidTuning(500, 0.6, 0.4, 0)
        
        let finalDelay = stopDelay;
        
        if (finalDelay == 0) {
            finalDelay = Math.trunc(pins.map(speed, 0, 255, 1200, 100));
            finalDelay = Math.clamp(50, 2000, finalDelay);
        }

        if (until == MAKEROBOTLineFollowUntil.Obstacle) {
            lineFollowUntilObstacleWithPin(AnalogReadWritePin.P0, speed, 10)
        } else {
            lineFollowWithPin(AnalogReadWritePin.P0, speed, true, finalDelay)
        }
    }

    /**
     * Go left or right from the current line position.
     * In JS: robotTurn(move, speed)
     */
    //% block="robot turn %move"
    //% subcategory="TRACER Junior"
    //% group="Movement"
    //% weight=80
    export function robotTurn(move: MAKEROBOTMove, speed: number = 150): void {
        if (move == MAKEROBOTMove.Right) {
            turnToLineWithPin(MAKEROBOTTurnDirection.Right, speed, AnalogReadWritePin.P0)
        } else if (move == MAKEROBOTMove.Left) {
            turnToLineWithPin(MAKEROBOTTurnDirection.Left, speed, AnalogReadWritePin.P0)
        }
    }

    // ==========================================
    // TRACER SENIOR BLOCKS
    // ==========================================

    /**
     * Calibrate the robot line sensor.
     */
    //% block="robot calibration pin %pin speed %speed"
    //% pin.defl=MAKEROBOTCalibrationPin.P9
    //% speed.min=0 speed.max=255 speed.defl=120
    //% subcategory="TRACER Senior"
    //% group="Setup"
    //% weight=100
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
    //% subcategory="TRACER Senior"
    //% group="Movement"
    //% weight=90
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
    //% subcategory="TRACER Senior"
    //% group="Setup"
    //% weight=80
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
    //% subcategory="TRACER Senior"
    //% group="Sensors"
    //% weight=70
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
    //% subcategory="TRACER Senior"
    //% group="Setup"
    //% weight=60
    export function setUltrasonic(trig: MAKEROBOTUltrasonicPin, echo: MAKEROBOTUltrasonicPin): void {
        ultrasonicTrigPin = ultrasonicPinValue(trig)
        ultrasonicEchoPin = ultrasonicPinValue(echo)
    }

    /**
     * Return distance measured by ultrasonic sensor in centimeters.
     */
    //% block="ultrasonic distance (cm)"
    //% subcategory="TRACER Senior"
    //% group="Sensors"
    //% weight=50
    export function readUltrasonic(): number {
        ultrasonicEnabled = true
        readUltrasonicNow()
        return ultrasonicDistance
    }

    // ==========================================
    // TRACER EXPERT BLOCKS (HIDDEN)
    // ==========================================

    /**
     * Set the PID tuning values.
     */
    //% block="set PID tuning setpoint %setpoint kp %kp kd %kd ki %ki"
    //% setpoint.defl=500
    //% kp.defl=0.6
    //% kd.defl=0.4
    //% ki.defl=0
    //% inlineInputMode=inline
    //% subcategory="TRACER Expert"
    //% group="Setup"
    //% weight=100
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
    //% subcategory="TRACER Expert"
    //% group="Movement"
    //% weight=90
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
    //% subcategory="TRACER Expert"
    //% group="Movement"
    //% weight=80
    //% blockHidden=true
    export function robotTurnToLine(direction: MAKEROBOTTurnDirection, speed: number, pin: MAKEROBOTLinePin): void {
        turnToLineWithPin(direction, speed, linePinValue(pin))
    }

    /**
     * Stop the robot.
     */
    //% block="robot stop"
    //% subcategory="TRACER Expert"
    //% group="Movement"
    //% weight=70
    //% blockHidden=true
    export function robotStop(): void {
        motionbit.brakeMotor(leftMotorChannel1)
        motionbit.brakeMotor(leftMotorChannel2)
        motionbit.brakeMotor(rightMotorChannel1)
        motionbit.brakeMotor(rightMotorChannel2)
    }

    // ==========================================
    // BLITZ REMOTE BLOCKS
    // ==========================================

    /**
     * Check the state of the gamepad rocker (joystick).
     */
    //% block="remote rocker %value"
    //% subcategory="BLITZ Remote"
    //% weight=100
    export function blitzRemoteRocker(value: MAKEROBOTRocker): boolean {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        let x = pins.analogReadPin(AnalogPin.P1);
        let y = pins.analogReadPin(AnalogPin.P2);
        let z = pins.digitalReadPin(DigitalPin.P8);
        
        let now_state = MAKEROBOTRocker.None;
        
        let isUp = x < 200;
        let isDown = x > 730;
        let isRight = y < 200;
        let isLeft = y > 730;

        if (isUp && isRight) {
            now_state = MAKEROBOTRocker.UpRight;
        } else if (isDown && isRight) {
            now_state = MAKEROBOTRocker.DownRight;
        } else if (isDown && isLeft) {
            now_state = MAKEROBOTRocker.DownLeft;
        } else if (isUp && isLeft) {
            now_state = MAKEROBOTRocker.UpLeft;
        } 
        else if (isUp) {
            now_state = MAKEROBOTRocker.Up;
        } else if (isDown) {
            now_state = MAKEROBOTRocker.Down;
        } else if (isRight) {
            now_state = MAKEROBOTRocker.Right;
        } else if (isLeft) {
            now_state = MAKEROBOTRocker.Left;
        }
        
        if (z == 0) {
            now_state = MAKEROBOTRocker.Press;
        }
        
        return now_state == value;
    }

    /**
     * Check the state of the gamepad buttons.
     */
    //% block="remote button %num is %value"
    //% subcategory="BLITZ Remote"
    //% weight=90
    export function blitzRemoteButton(num: MAKEROBOTRemoteButton, value: MAKEROBOTButtonState): boolean {
        let temp = false;
        switch (num) {
            case MAKEROBOTRemoteButton.B1: {
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P13) == value) { temp = true; }
                break;
            }
            case MAKEROBOTRemoteButton.B2: {
                pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P14) == value) { temp = true; }
                break;
            }
            case MAKEROBOTRemoteButton.B3: {
                pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P15) == value) { temp = true; }
                break;
            }
            case MAKEROBOTRemoteButton.B4: {
                pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
                if (pins.digitalReadPin(DigitalPin.P16) == value) { temp = true; }
                break;
            }
        }
        return temp;
    }

    /**
     * Read the pitch or roll of the remote and map it to a specific output range.
     */
    //% block="remote motion %axis angle from %startAngle to %endAngle map to %outStart to %outEnd"
    //% startAngle.defl=-90 endAngle.defl=90
    //% outStart.defl=-255 outEnd.defl=255
    //% inlineInputMode=inline
    //% subcategory="BLITZ Remote"
    //% weight=80
    export function blitzRemoteMotion(axis: MAKEROBOTAxis, startAngle: number, endAngle: number, outStart: number, outEnd: number): number {
        let angle = 0;
        
        if (axis == MAKEROBOTAxis.Pitch) {
            angle = input.rotation(Rotation.Pitch);
        } else {
            angle = input.rotation(Rotation.Roll);
        }
        
        // Ensure angle is clamped between the user's start and end angles
        let minAngle = Math.min(startAngle, endAngle);
        let maxAngle = Math.max(startAngle, endAngle);
        let constrainedAngle = Math.clamp(minAngle, maxAngle, angle);
        
        // Map the angle to the output range
        let mapped = pins.map(constrainedAngle, startAngle, endAngle, outStart, outEnd);
        
        // Clamp the final output just in case of weird math bounds
        let minOut = Math.min(outStart, outEnd);
        let maxOut = Math.max(outStart, outEnd);
        
        return Math.clamp(minOut, maxOut, Math.trunc(mapped));
    }
    
    /**
     * Check if the remote is tilted in a specific direction (with a 30-degree deadzone).
     */
    //% block="remote tilted %direction"
    //% subcategory="BLITZ Remote"
    //% weight=75
    export function blitzRemoteTilted(direction: MAKEROBOTGyroDirection): boolean {
        let pitch = input.rotation(Rotation.Pitch);
        let roll = input.rotation(Rotation.Roll);

        if (direction == MAKEROBOTGyroDirection.PitchForward) {
            return pitch > 30;
        } else if (direction == MAKEROBOTGyroDirection.PitchBackward) {
            return pitch < -30;
        } else if (direction == MAKEROBOTGyroDirection.RollLeft) {
            return roll < -30;
        } else if (direction == MAKEROBOTGyroDirection.RollRight) {
            return roll > 30;
        }
        
        return false;
    }


    // ==========================================
    // BLITZ ROBOT BLOCKS
    // ==========================================

    /**
     * Enter alignment calibration mode. Press A/B to adjust trim, and Logo or A+B to save and exit.
     */
    //% block="BLITZ calibrate alignment (A/B to adjust, Logo to save)"
    //% subcategory="BLITZ Robot"
    //% group="Setup"
    //% weight=105
    export function blitzCalibrateAlignment(): void {
        // ANTI-BOUNCE: If triggered via a button event, wait for release first
        while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || input.logoIsPressed()) {
            basic.pause(10);
        }

        let calibrating = true;
        showTrimLed();
        
        while (calibrating) {
            let exitTriggered = false;

            if (input.logoIsPressed()) {
                exitTriggered = true;
            } else if (input.buttonIsPressed(Button.A)) {
                robotTrim = limit(robotTrim - 5, -50, 50);
                showTrimLed();
                // Wait until A is released to prevent runaway scrolling
                while(input.buttonIsPressed(Button.A)) {
                    basic.pause(10);
                }
            } else if (input.buttonIsPressed(Button.B)) {
                robotTrim = limit(robotTrim + 5, -50, 50);
                showTrimLed();
                // Wait until B is released
                while(input.buttonIsPressed(Button.B)) {
                    basic.pause(10);
                }
            }

            if (exitTriggered) {
                calibrating = false;
                basic.showIcon(IconNames.Yes);
                basic.pause(1000);
                basic.clearScreen();
                // Wait for all buttons to be fully released before exiting the function
                while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || input.logoIsPressed()) {
                    basic.pause(10);
                }
            }
            
            basic.pause(10);
        }
    }

    /**
     * Move the BLITZ robot in a standard direction.
     */
    //% block="BLITZ robot move %direction at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=150
    //% subcategory="BLITZ Robot"
    //% group="Movement"
    //% weight=100
    export function blitzRobotMove(direction: BLITZMove, speed: number = 150): void {
        const baseSpeed = limit(speed, 0, 255);
        let leftSpeed = baseSpeed;
        let rightSpeed = baseSpeed;

        if (direction == BLITZMove.Forward || direction == BLITZMove.Backward) {
            if (robotTrim < 0) {
                // robotTrim is negative, so adding it reduces leftSpeed
                leftSpeed += robotTrim; 
            } else if (robotTrim > 0) {
                // robotTrim is positive, so subtracting it reduces rightSpeed
                rightSpeed -= robotTrim; 
            }
        }
        
        if (direction == BLITZMove.Backward) {
            leftSpeed = -leftSpeed;
            rightSpeed = -rightSpeed;
        } else if (direction == BLITZMove.TurnLeft) {
            leftSpeed = -baseSpeed;
            rightSpeed = baseSpeed;
        } else if (direction == BLITZMove.TurnRight) {
            leftSpeed = baseSpeed;
            rightSpeed = -baseSpeed;
        }

        runMotorSignedLeft(leftSpeed);
        runMotorSignedRight(rightSpeed);
    }

    /**
     * Move the BLITZ robot forward or backward while cornering (turning).
     */
    //% block="BLITZ robot move %direction cornering %corner radius(0-100) %radius speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=150
    //% radius.min=0 radius.max=100 radius.defl=50
    //% subcategory="BLITZ Robot"
    //% group="Movement"
    //% weight=95
    export function blitzRobotCorner(direction: BLITZDirection, corner: BLITZCorner, radius: number, speed: number): void {
        const baseSpeed = limit(speed, 0, 255);
        const innerSpeed = Math.trunc(baseSpeed * (limit(radius, 0, 100) / 100));
        
        let leftSpeed = 0;
        let rightSpeed = 0;

        if (corner == BLITZCorner.Left) {
            leftSpeed = innerSpeed;
            rightSpeed = baseSpeed;
        } else {
            leftSpeed = baseSpeed;
            rightSpeed = innerSpeed;
        }

        if (robotTrim < 0) {
            leftSpeed += robotTrim; 
        } else if (robotTrim > 0) {
            rightSpeed -= robotTrim; 
        }

        if (direction == BLITZDirection.Backward) {
            leftSpeed = -leftSpeed;
            rightSpeed = -rightSpeed;
        }

        runMotorSignedLeft(leftSpeed);
        runMotorSignedRight(rightSpeed);
    }

    /**
     * Stop and brake all BLITZ robot motors immediately.
     */
    //% block="BLITZ robot brake"
    //% subcategory="BLITZ Robot"
    //% group="Movement"
    //% weight=90
    export function blitzRobotBrake(): void {
        robotStop();
    }

    /**
     * Move the BLITZ robot in mecanum directions (sideways and diagonal).
     */
    //% block="BLITZ robot mecanum %direction at speed %speed"
    //% speed.min=0 speed.max=255 speed.defl=150
    //% subcategory="BLITZ Robot"
    //% group="Mecanum"
    //% weight=80
    export function blitzRobotMecanum(direction: BLITZMecanum, speed: number = 150): void {
        const motorSpeed = limit(speed, 0, 255);
        
        if (direction == BLITZMecanum.Right) {
            runMotorSingle(leftMotorChannel1, motorSpeed);
            runMotorSingle(leftMotorChannel2, -motorSpeed);
            runMotorSingle(rightMotorChannel1, -motorSpeed);
            runMotorSingle(rightMotorChannel2, motorSpeed);
        } else if (direction == BLITZMecanum.Left) {
            runMotorSingle(leftMotorChannel1, -motorSpeed);
            runMotorSingle(leftMotorChannel2, motorSpeed);
            runMotorSingle(rightMotorChannel1, motorSpeed);
            runMotorSingle(rightMotorChannel2, -motorSpeed);
        } else if (direction == BLITZMecanum.ForwardRight) {
            runMotorSingle(leftMotorChannel1, motorSpeed);
            runMotorSingle(leftMotorChannel2, 0);
            runMotorSingle(rightMotorChannel1, 0);
            runMotorSingle(rightMotorChannel2, motorSpeed);
        } else if (direction == BLITZMecanum.ForwardLeft) {
            runMotorSingle(leftMotorChannel1, 0);
            runMotorSingle(leftMotorChannel2, motorSpeed);
            runMotorSingle(rightMotorChannel1, motorSpeed);
            runMotorSingle(rightMotorChannel2, 0);
        } else if (direction == BLITZMecanum.BackwardRight) {
            runMotorSingle(leftMotorChannel1, 0);
            runMotorSingle(leftMotorChannel2, -motorSpeed);
            runMotorSingle(rightMotorChannel1, -motorSpeed);
            runMotorSingle(rightMotorChannel2, 0);
        } else if (direction == BLITZMecanum.BackwardLeft) {
            runMotorSingle(leftMotorChannel1, -motorSpeed);
            runMotorSingle(leftMotorChannel2, 0);
            runMotorSingle(rightMotorChannel1, 0);
            runMotorSingle(rightMotorChannel2, -motorSpeed);
        }
    }

    // ==========================================
    // INTERNAL FUNCTIONS (HIDDEN)
    // ==========================================

    function showTrimLed(): void {
        // Map the -50 to 50 range onto the 5 horizontal LEDs
        let x = 2;
        if (robotTrim <= -20) x = 0;
        else if (robotTrim < 0) x = 1;
        else if (robotTrim >= 20) x = 4;
        else if (robotTrim > 0) x = 3;

        basic.clearScreen();
        
        for (let i = 0; i < 5; i++) {
            led.plot(i, 2); 
        }
        
        led.plot(x, 1);
        led.plot(x, 0); 
        led.plot(2, 3); 
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
    
    function runMotorSingle(channel: MotionBitMotorChannel, speed: number): void {
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
