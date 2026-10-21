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

// --- NEW JUNCTION ENUM ---
enum MAKEROBOTJunction {
    //% block="cross / t-junction"
    Cross,
    //% block="left branch"
    Left,
    //% block="right branch"
    Right
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
enum MAKEROBOTTracerCommand {
    //% block="UP"
    Up = 1,
    //% block="DOWN"
    Down = 2,
    //% block="LEFT"
    Left = 3,
    //% block="RIGHT"
    Right = 4,
    //% block="STOP"
    Stop = 0
}

enum MAKEROBOTBlitzCommand {
    //% block="UP"
    Up = 1,
    //% block="DOWN"
    Down = 2,
    //% block="LEFT"
    Left = 3,
    //% block="RIGHT"
    Right = 4,
    //% block="UP-LEFT"
    UpLeft = 5,
    //% block="UP-RIGHT"
    UpRight = 6,
    //% block="DOWN-LEFT"
    DownLeft = 7,
    //% block="DOWN-RIGHT"
    DownRight = 8,
    //% block="SLIDE LEFT"
    SlideLeft = 9,
    //% block="SLIDE RIGHT"
    SlideRight = 10,
    //% block="STOP"
    Stop = 0
}

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

// --- MAKEROBOT APPS ENUMS ---
enum MAKEROBOTAppButtonState {
    //% block="pressed"
    Pressed,
    //% block="released"
    Released
}

enum MAKEROBOTTracerAppButton {
    //% block="D-Pad UP"
    Up,
    //% block="D-Pad DOWN"
    Down,
    //% block="D-Pad LEFT"
    Left,
    //% block="D-Pad RIGHT"
    Right,
    //% block="CALIBRATE"
    Calibrate
}

enum MAKEROBOTBlitzAppButton {
    //% block="Triangle (Green)"
    Triangle,
    //% block="Square (Pink)"
    Square,
    //% block="Circle (Red)"
    Circle,
    //% block="Cross (Blue)"
    Cross,
    //% block="D-Pad UP"
    Up,
    //% block="D-Pad DOWN"
    Down,
    //% block="D-Pad LEFT"
    Left,
    //% block="D-Pad RIGHT"
    Right
}

enum MAKEROBOTBlitzAppJoystick {
    //% block="FORWARD"
    Forward,
    //% block="BACKWARD"
    Backward,
    //% block="SLIDE LEFT"
    Left,
    //% block="SLIDE RIGHT"
    Right,
    //% block="FORWARD-LEFT"
    ForwardLeft,
    //% block="FORWARD-RIGHT"
    ForwardRight,
    //% block="BACKWARD-LEFT"
    BackwardLeft,
    //% block="BACKWARD-RIGHT"
    BackwardRight,
    //% block="NEUTRAL (STOP)"
    Neutral
}

//% color=#3455db icon="\uf1b9"
//% block="MAKEROBOT"
//% subcategories=["MAKEROBOT Tracer Junior", "MAKEROBOT Tracer Senior", "MAKEROBOT Tracer Expert", "MAKEROBOT Blitz", "MAKEROBOT Remote", "MAKEROBOT Apps"]
//% groups=["Setup", "Movement", "Sensors", "Semi Auto", "Mecanum", "TRACER Semi Auto", "BLITZ Remote", "Tracer App", "Blitz App", "App Telemetry"]
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
    let ultrasonicEnabled = true
    let ultrasonicDivisor = control.hardwareVersion() == "1" ? 39 : 58
    
    let robotTrim = 0
    let isIsobotMode = false;

    control.inBackground(function () {
        while (true) {
            if (ultrasonicEnabled) {
                readUltrasonicNow()
                basic.pause(50) 
            } else {
                basic.pause(50)
            }
        }
    })

    // ==========================================
    // TRACER JUNIOR BLOCKS
    // ==========================================

    /**
     * Switch the robot tuning to ISOBOT (2-wheel) mode. (Defaults to 4-wheel if this block is not used).
     */
    //% block="Set to ISOBOT mode"
    //% subcategory="MAKEROBOT Tracer Junior"
    //% group="Setup"
    //% weight=200
    export function setIsobotMode(): void {
        isIsobotMode = true;
    }

    /**
     * Calibrate the robot line sensor using default settings.
     */
    //% block="robot calibration"
    //% subcategory="MAKEROBOT Tracer Junior"
    //% group="Setup"
    //% weight=100
    export function juniorRobotCalibration(speed: number = 120): void {
        robotCalibration(MAKEROBOTCalibrationPin.P9, speed)
    }

    /**
     * Follow the line until the robot reaches a cross or obstacle.
     */
    //% block="robot line follow until %until"
    //% speed.defl=0
    //% subcategory="MAKEROBOT Tracer Junior"
    //% group="Movement"
    //% weight=90
    export function robotLineFollowUntil(until: MAKEROBOTLineFollowUntil, speed: number = 0, stopDelay: number = 0): void {
        setPidTuning(500, 0.6, 0.4, 0)
        
        let actualSpeed = speed;
        if (actualSpeed == 0) {
            actualSpeed = isIsobotMode ? 180 : 200;
        }
        
        let finalDelay = stopDelay;
        
        if (finalDelay == 0) {
            if (isIsobotMode) {
                finalDelay = Math.trunc(pins.map(actualSpeed, 0, 255, 1200, 100));
                finalDelay = Math.clamp(50, 2000, finalDelay);
            } else {
                finalDelay = Math.trunc(pins.map(actualSpeed, 0, 255, 400, 100)) + 400;
                finalDelay = Math.clamp(50, 1400, finalDelay);
            }
        }

        if (until == MAKEROBOTLineFollowUntil.Obstacle) {
            lineFollowUntilObstacleWithPin(AnalogReadWritePin.P0, actualSpeed, 10)
        } else {
            lineFollowWithPin(AnalogReadWritePin.P0, actualSpeed, true, finalDelay)
        }
    }

    /**
     * Check if an obstacle is detected within 15 cm.
     */
    //% block="obstacle detected < 15 cm"
    //% subcategory="MAKEROBOT Tracer Junior"
    //% group="Sensors"
    //% weight=85
    export function juniorObstacleDetected(): boolean {
        ultrasonicEnabled = true;
        return ultrasonicDistance < 15;
    }

    /**
     * Go left or right from the current line position.
     */
    //% block="robot turn %move"
    //% speed.defl=0
    //% subcategory="MAKEROBOT Tracer Junior"
    //% group="Movement"
    //% weight=80
    export function robotTurn(move: MAKEROBOTMove, speed: number = 0): void {
        let actualSpeed = speed;
        if (actualSpeed == 0) {
            actualSpeed = isIsobotMode ? 180 : 200;
        }

        if (move == MAKEROBOTMove.Right) {
            turnToLineWithPin(MAKEROBOTTurnDirection.Right, actualSpeed, AnalogReadWritePin.P0)
        } else if (move == MAKEROBOTMove.Left) {
            turnToLineWithPin(MAKEROBOTTurnDirection.Left, actualSpeed, AnalogReadWritePin.P0)
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
    //% subcategory="MAKEROBOT Tracer Senior"
    //% group="Setup"
    //% weight=190
    export function robotCalibration(pin: MAKEROBOTCalibrationPin, speed: number): void {
        const motorSpeed = limit(speed, 0, 255)
        const calibrationPin = calibrationPinValue(pin)

        const pauseShort = isIsobotMode ? 1000 : 2000;
        const pauseLong = isIsobotMode ? 2000 : 4000;

        enterCalibration(calibrationPin)
        runMotorSignedLeft(-motorSpeed)
        runMotorSignedRight(motorSpeed)
        basic.pause(pauseShort)
        
        runMotorSignedLeft(motorSpeed)
        runMotorSignedRight(-motorSpeed)
        basic.pause(pauseLong)
        
        runMotorSignedLeft(-motorSpeed)
        runMotorSignedRight(motorSpeed)
        basic.pause(pauseShort)
        
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
    //% subcategory="MAKEROBOT Tracer Senior"
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
    //% subcategory="MAKEROBOT Tracer Senior"
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
     * Set ultrasonic sensor trigger and echo pins.
     */
    //% block="set ultrasonic Trig %trig Echo %echo"
    //% trig.defl=MAKEROBOTUltrasonicPin.P1
    //% echo.defl=MAKEROBOTUltrasonicPin.P2
    //% inlineInputMode=inline
    //% subcategory="MAKEROBOT Tracer Senior"
    //% group="Setup"
    //% weight=78
    export function setUltrasonic(trig: MAKEROBOTUltrasonicPin, echo: MAKEROBOTUltrasonicPin): void {
        ultrasonicTrigPin = ultrasonicPinValue(trig)
        ultrasonicEchoPin = ultrasonicPinValue(echo)
    }

    /**
     * Read the raw analog line position (0 to 1023). ~500 is perfectly centered.
     */
    //% block="line position on pin %pin"
    //% pin.defl=MAKEROBOTLinePin.P0
    //% subcategory="MAKEROBOT Tracer Senior"
    //% group="Sensors"
    //% weight=76
    export function readLinePosition(pin: MAKEROBOTLinePin): number {
        return pins.analogReadPin(linePinValue(pin));
    }

    /**
     * Check if a specific type of intersection is currently detected by the Maker Line.
     */
    //% block="junction %junction detected"
    //% subcategory="MAKEROBOT Tracer Senior"
    //% group="Sensors"
    //% weight=75
    export function junctionDetected(junction: MAKEROBOTJunction): boolean {
        let leftExtreme = makerLineDetected(makerLineD1);
        let rightExtreme = makerLineDetected(makerLineD5);

        if (junction == MAKEROBOTJunction.Cross) {
            return leftExtreme && rightExtreme;
        } else if (junction == MAKEROBOTJunction.Left) {
            return leftExtreme && !rightExtreme;
        } else if (junction == MAKEROBOTJunction.Right) {
            return !leftExtreme && rightExtreme;
        }
        return false;
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
    //% subcategory="MAKEROBOT Tracer Senior"
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
     * Check if an obstacle is detected within a specific distance.
     */
    //% block="obstacle detected < %distance cm"
    //% distance.defl=15
    //% subcategory="MAKEROBOT Tracer Senior"
    //% group="Sensors"
    //% weight=55
    export function obstacleDetected(distance: number): boolean {
        ultrasonicEnabled = true;
        return ultrasonicDistance < distance;
    }

    /**
     * Return distance measured by ultrasonic sensor in centimeters.
     */
    //% block="ultrasonic distance (cm)"
    //% subcategory="MAKEROBOT Tracer Senior"
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
    //% subcategory="MAKEROBOT Tracer Expert"
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
    //% speed.min=0 speed.max=255 speed.defl=180
    //% cross.shadow="toggleOnOff"
    //% cross.defl=true
    //% stopTimer.min=0 stopTimer.defl=0
    //% inlineInputMode=inline
    //% subcategory="MAKEROBOT Tracer Expert"
    //% group="Movement"
    //% weight=90
    //% blockHidden=true
    export function robotLineFollow(pin: MAKEROBOTLinePin, speed: number = 180, cross: boolean, stopTimer: number): void {
        lineFollowWithPin(linePinValue(pin), speed, cross, stopTimer)
    }

    /**
     * Turn until the robot finds the line again.
     */
    //% block="robot turn to line %direction speed %speed pin %pin"
    //% direction.defl=MAKEROBOTTurnDirection.Left
    //% speed.min=0 speed.max=255 speed.defl=180
    //% pin.defl=MAKEROBOTLinePin.P0
    //% inlineInputMode=inline
    //% subcategory="MAKEROBOT Tracer Expert"
    //% group="Movement"
    //% weight=80
    //% blockHidden=true
    export function robotTurnToLine(direction: MAKEROBOTTurnDirection, speed: number = 180, pin: MAKEROBOTLinePin): void {
        turnToLineWithPin(direction, speed, linePinValue(pin))
    }

    /**
     * Stop the robot.
     */
    //% block="robot stop"
    //% subcategory="MAKEROBOT Tracer Expert"
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
    // BLITZ ROBOT BLOCKS
    // ==========================================

    /**
     * Enter alignment calibration mode. Press A/B to adjust trim, and Logo or A+B to save and exit.
     */
    //% block="BLITZ calibrate alignment (A/B to adjust, Logo to save)"
    //% subcategory="MAKEROBOT Blitz"
    //% group="Setup"
    //% weight=105
    export function blitzCalibrateAlignment(): void {
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
                while(input.buttonIsPressed(Button.A)) {
                    basic.pause(10);
                }
            } else if (input.buttonIsPressed(Button.B)) {
                robotTrim = limit(robotTrim + 5, -50, 50);
                showTrimLed();
                while(input.buttonIsPressed(Button.B)) {
                    basic.pause(10);
                }
            }

            if (exitTriggered) {
                calibrating = false;
                basic.showIcon(IconNames.Yes);
                basic.pause(1000);
                basic.clearScreen();
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
    //% subcategory="MAKEROBOT Blitz"
    //% group="Movement"
    //% weight=180
    export function blitzRobotMove(direction: BLITZMove, speed: number = 150): void {
        const baseSpeed = limit(speed, 0, 255);
        let leftSpeed = baseSpeed;
        let rightSpeed = baseSpeed;

        if (direction == BLITZMove.Forward || direction == BLITZMove.Backward) {
            if (robotTrim < 0) {
                leftSpeed += robotTrim; 
            } else if (robotTrim > 0) {
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
    //% subcategory="MAKEROBOT Blitz"
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
    //% subcategory="MAKEROBOT Blitz"
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
    //% subcategory="MAKEROBOT Blitz"
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
    // MAKEROBOT REMOTE BLOCKS
    // ==========================================

    /**
     * Check the state of the gamepad rocker (joystick).
     */
    //% block="remote rocker %value"
    //% subcategory="MAKEROBOT Remote"
    //% weight=170
    export function remoteRocker(value: MAKEROBOTRocker): boolean {
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
    //% subcategory="MAKEROBOT Remote"
    //% weight=90
    export function remoteButton(num: MAKEROBOTRemoteButton, value: MAKEROBOTButtonState): boolean {
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
    //% subcategory="MAKEROBOT Remote"
    //% weight=80
    export function remoteMotion(axis: MAKEROBOTAxis, startAngle: number, endAngle: number, outStart: number, outEnd: number): number {
        let angle = 0;
        
        if (axis == MAKEROBOTAxis.Pitch) {
            angle = input.rotation(Rotation.Pitch);
        } else {
            angle = input.rotation(Rotation.Roll);
        }
        
        let minAngle = Math.min(startAngle, endAngle);
        let maxAngle = Math.max(startAngle, endAngle);
        let constrainedAngle = Math.clamp(minAngle, maxAngle, angle);
        
        let mapped = pins.map(constrainedAngle, startAngle, endAngle, outStart, outEnd);
        
        let minOut = Math.min(outStart, outEnd);
        let maxOut = Math.max(outStart, outEnd);
        
        return Math.clamp(minOut, maxOut, Math.trunc(mapped));
    }
    
    /**
     * Check if the remote is tilted in a specific direction (with a 30-degree deadzone).
     */
    //% block="remote tilted %direction"
    //% subcategory="MAKEROBOT Remote"
    //% weight=75
    export function remoteTilted(direction: MAKEROBOTGyroDirection): boolean {
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

    /**
     * Use this block to check which command the robot received! (Or snap into a radio block to send it)
     */
    //% block="TRACER command %command"
    //% subcategory="MAKEROBOT Remote"
    //% group="TRACER Semi Auto"
    //% weight=10
    export function readTracerCommand(command: MAKEROBOTTracerCommand): number {
        return command;
    }

    /**
     * Use this block to check which command the BLITZ robot received! (Or snap into a radio block to send it)
     */
    //% block="BLITZ command %command"
    //% subcategory="MAKEROBOT Remote"
    //% group="BLITZ Remote"
    //% weight=9
    export function readBlitzCommand(command: MAKEROBOTBlitzCommand): number {
        return command;
    }


    // ==========================================
    // MAKEROBOT APPS (WEB BLUETOOTH CONTROLLER)
    // ==========================================

    /**
     * Get the exact string command sent by the Tracer App Button.
     */
    //% block="Tracer App button %button is %state"
    //% subcategory="MAKEROBOT Apps"
    //% group="Tracer App"
    //% weight=160
    export function tracerAppButtonCommand(button: MAKEROBOTTracerAppButton, state: MAKEROBOTAppButtonState): string {
        let btnStr = "";
        switch(button) {
            case MAKEROBOTTracerAppButton.Up: btnStr = "up"; break;
            case MAKEROBOTTracerAppButton.Down: btnStr = "down"; break;
            case MAKEROBOTTracerAppButton.Left: btnStr = "left"; break;
            case MAKEROBOTTracerAppButton.Right: btnStr = "right"; break;
            case MAKEROBOTTracerAppButton.Calibrate: btnStr = "cir"; break;
        }
        let stateStr = (state == MAKEROBOTAppButtonState.Pressed) ? "1" : "0";
        return btnStr + stateStr;
    }

    /**
     * Get the exact string command sent by the Blitz App Dual Joysticks.
     */
    //% block="Blitz App dual joystick %direction"
    //% subcategory="MAKEROBOT Apps"
    //% group="Blitz App"
    //% weight=90
    export function blitzAppJoystickCommand(direction: MAKEROBOTBlitzAppJoystick): string {
        switch(direction) {
            case MAKEROBOTBlitzAppJoystick.Forward: return "M_U";
            case MAKEROBOTBlitzAppJoystick.Backward: return "M_D";
            case MAKEROBOTBlitzAppJoystick.Left: return "M_L";
            case MAKEROBOTBlitzAppJoystick.Right: return "M_R";
            case MAKEROBOTBlitzAppJoystick.ForwardLeft: return "M_UL";
            case MAKEROBOTBlitzAppJoystick.ForwardRight: return "M_UR";
            case MAKEROBOTBlitzAppJoystick.BackwardLeft: return "M_DL";
            case MAKEROBOTBlitzAppJoystick.BackwardRight: return "M_DR";
            case MAKEROBOTBlitzAppJoystick.Neutral: return "M_N";
        }
        return "M_N";
    }

    /**
     * Get the exact string command sent by the Blitz App Buttons.
     */
    //% block="Blitz App button %button is %state"
    //% subcategory="MAKEROBOT Apps"
    //% group="Blitz App"
    //% weight=80
    export function blitzAppButtonCommand(button: MAKEROBOTBlitzAppButton, state: MAKEROBOTAppButtonState): string {
        let btnStr = "";
        switch(button) {
            case MAKEROBOTBlitzAppButton.Triangle: btnStr = "tri"; break;
            case MAKEROBOTBlitzAppButton.Square: btnStr = "sq"; break;
            case MAKEROBOTBlitzAppButton.Circle: btnStr = "cir"; break;
            case MAKEROBOTBlitzAppButton.Cross: btnStr = "cross"; break;
            case MAKEROBOTBlitzAppButton.Up: btnStr = "up"; break;
            case MAKEROBOTBlitzAppButton.Down: btnStr = "down"; break;
            case MAKEROBOTBlitzAppButton.Left: btnStr = "left"; break;
            case MAKEROBOTBlitzAppButton.Right: btnStr = "right"; break;
        }
        let stateStr = (state == MAKEROBOTAppButtonState.Pressed) ? "1" : "0";
        return btnStr + stateStr;
    }

    /**
     * Format a label and number to send back to the App's Telemetry screen! 
     * (Snap this inside a 'bluetooth uart write string' block)
     */
    //% block="App format telemetry label %label value %value"
    //% label.defl="DIST"
    //% subcategory="MAKEROBOT Apps"
    //% group="App Telemetry"
    //% weight=70
    export function appTelemetryFormat(label: string, value: number): string {
        return label + ":" + value + "#";
    }

    // ==========================================
    // INTERNAL FUNCTIONS (HIDDEN)
    // ==========================================

    function showTrimLed(): void {
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

        let pulse = pins.pulseIn(ultrasonicEchoPin, PulseValue.High, 255 * ultrasonicDivisor + 20000)
        let dist = pulse == 0 ? 255 : Math.idiv(pulse, ultrasonicDivisor)

        if (dist > 20 && ultrasonicDistance <= 20) {
            basic.pause(10) 
            pins.digitalWritePin(ultrasonicTrigPin, 0)
            control.waitMicros(2)
            pins.digitalWritePin(ultrasonicTrigPin, 1)
            control.waitMicros(10)
            pins.digitalWritePin(ultrasonicTrigPin, 0)
            
            pulse = pins.pulseIn(ultrasonicEchoPin, PulseValue.High, 255 * ultrasonicDivisor + 20000)
            dist = pulse == 0 ? 255 : Math.idiv(pulse, ultrasonicDivisor)
        }

        ultrasonicDistance = dist
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
