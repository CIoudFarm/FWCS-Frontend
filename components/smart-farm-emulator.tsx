"use client";

import { useState, useEffect, useRef } from "react";
interface Position {
  x: number;
  y: number;
  layer?: number;
  control?: Control;
}

interface RobotPosition {
  x: number;
  y: number;
}

interface Robot {
  id: string;
  name: string;
  layer: number;
  position: RobotPosition;
}

interface ControlOption {
  value: number;
  label: string;
}

interface Trigger {
  sensor: string;
  operator: string;
  value: number;
  action?: {
    value: number;
  };
}

interface Control {
  default: number;
  options?: ControlOption[];
  triggers?: Trigger[];
}

interface Sensor {
  type: string;
  positions: Position[];
}

interface Actuator {
  type: string;
  positions: Position[];
  control: Control;
}

interface Hardware {
  layers: number;
  beds_per_layer: number;
  sensors: Sensor[];
  actuators: Actuator[];
  robots: Robot[];
}

interface Dimensions {
  width: string;
  length: string;
  height: string;
}

interface BaseConfig {
  dimensions: Dimensions;
  hardware: Hardware;
  plants: PlantInfo[];
}

interface UserConfig {
  name: string;
  type: string;
  scale: string;
  temperature: string;
  humidity: string;
  power: string;
  description: string;
}

interface SensorData {
  temperature: number;
  humidity: number;
}

interface RobotShape {
  circle: any;
  label: any;
  robot: Robot;
}

interface SmartFarmEmulatorProps {
  userConfig: UserConfig;
  baseConfig: BaseConfig;
}

// 식물 타입 정의 추가 (interface 섹션에 추가)
interface PlantInfo {
  type: string;
  name: string;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  positions: Position[];
  growthStage: number; // 0-100 성장 단계
}

// SmartFarmEmulatorProps 인터페이스에 plants 속성 추가
interface SmartFarmEmulatorProps {
  userConfig: UserConfig;
  baseConfig: BaseConfig;
}

interface SmartFarmEmulatorProps {
  userConfig: UserConfig;
  baseConfig: BaseConfig;
}


// 식물 상태 평가 함수 추가 (drawHardware 함수 위에 추가)
const evaluatePlantHealth = (
  plant: PlantInfo,
  temperature: number,
  humidity: number
) => {
  // 온도 상태 확인
  let tempStatus = "optimal";
  if (temperature < plant.minTemp || temperature > plant.maxTemp) {
    tempStatus = "danger";
  } else if (
    temperature < plant.minTemp + 2 ||
    temperature > plant.maxTemp - 2
  ) {
    tempStatus = "warning";
  }

  // 습도 상태 확인
  let humidityStatus = "optimal";
  if (humidity < plant.minHumidity || humidity > plant.maxHumidity) {
    humidityStatus = "danger";
  } else if (
    humidity < plant.minHumidity + 5 ||
    humidity > plant.maxHumidity - 5
  ) {
    humidityStatus = "warning";
  }

  // 종합 상태 결정
  if (tempStatus === "danger" || humidityStatus === "danger") {
    return "danger";
  } else if (tempStatus === "warning" || humidityStatus === "warning") {
    return "warning";
  }
  return "optimal";
};

// 식물 색상 매핑 추가 (drawHardware 함수 위에 추가)
const plantColors = {
  tomato: {
    base: "#e53935",
    optimal: "#4caf50",
    warning: "#ff9800",
    danger: "#f44336",
  },
  lettuce: {
    base: "#8bc34a",
    optimal: "#4caf50",
    warning: "#ff9800",
    danger: "#f44336",
  },
  pepper: {
    base: "#9c27b0",
    optimal: "#4caf50",
    warning: "#ff9800",
    danger: "#f44336",
  },
};

export default function SmartFarmEmulator({
  userConfig,
  baseConfig,
}: SmartFarmEmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const konvaRef = useRef<any>(null);

  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24,
    humidity: 55,
  });
  const [manualSensorData, setManualSensorData] = useState<SensorData>({
    temperature: 24,
    humidity: 55,
  });
  const [mode, setMode] = useState<"random" | "manual">("random");
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [robotShapes, setRobotShapes] = useState<Record<string, RobotShape>>(
    {}
  );
  const [isKonvaReady, setIsKonvaReady] = useState(false);

  const actuators = baseConfig?.hardware?.actuators || [];
  const sensors = baseConfig?.hardware?.sensors || [];
  const robots = baseConfig?.hardware?.robots || [];
  const layers = baseConfig?.hardware?.layers || 1;
  const plants = baseConfig?.plants || [];
  const bedsPerLayer = baseConfig?.hardware?.beds_per_layer || 0;
  const dimensions = baseConfig?.dimensions || {
    width: "14m",
    length: "10m",
    height: "3m",
  };

  const farmWidth = Number.parseFloat(dimensions.width);
  const farmLength = Number.parseFloat(dimensions.length);

  // 컴포넌트 마운트 시 Konva 로드
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("konva").then((konvaModule) => {
        konvaRef.current = konvaModule.default;
        setIsKonvaReady(true);
      });
    }
  }, []);

  // 윈도우 크기에 따른 스테이지 크기 조정
  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        setStageSize({
          width: vw * 0.75,
          height: vh * 0.5,
        });
      }
    };
    updateSize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  // 랜덤 모드일 때 센서 데이터 업데이트
  useEffect(() => {
    if (mode === "random") {
      const interval = setInterval(() => {
        const temp = +(24 + Math.random() * 10).toFixed(1);
        const hum = +(40 + Math.random() * 20).toFixed(1);
        setSensorData({ temperature: temp, humidity: hum });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  // 로봇 움직임 애니메이션
  useEffect(() => {
    if (!isKonvaReady) return;

    const interval = setInterval(() => {
      const layer = layerRef.current;
      if (!layer) return;

      const newShapes = { ...robotShapes };
      Object.keys(robotShapes)?.forEach((id) => {
        const entry = robotShapes[id];
        const robot = entry.robot;
        const newX = Math.max(
          0,
          Math.min(1, robot.position.x + (Math.random() - 0.5) * 0.05)
        );
        const newY = Math.max(
          0,
          Math.min(1, robot.position.y + (Math.random() - 0.5) * 0.05)
        );
        const pixelX = newX * stageSize.width;
        const pixelY = newY * stageSize.height;
        entry.circle.to({ x: pixelX, y: pixelY, duration: 1 });
        entry.label.to({ x: pixelX + 10, y: pixelY - 6, duration: 1 });
        entry.robot.position.x = newX;
        entry.robot.position.y = newY;
      });
      layer.draw();
    }, 2000);

    return () => clearInterval(interval);
  }, [robotShapes, stageSize.width, stageSize.height, isKonvaReady]);

  // 수동 모드일 때 센서 데이터 업데이트
  useEffect(() => {
    if (mode === "manual") {
      setSensorData({ ...manualSensorData });
    }
  }, [manualSensorData, mode]);

  // Konva 스테이지 초기화
  useEffect(() => {
    if (!isKonvaReady || !containerRef.current || stageRef.current) return;

    const Konva = konvaRef.current;
    const stage = new Konva.Stage({
      container: containerRef.current,
      width: stageSize.width,
      height: stageSize.height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    stageRef.current = stage;
    layerRef.current = layer;
  }, [isKonvaReady, stageSize.width, stageSize.height]);

  // 하드웨어 그리기
  useEffect(() => {
    if (!isKonvaReady || !layerRef.current || !stageRef.current) return;

    const stage = stageRef.current;
    const layer = layerRef.current;

    stage.width(stageSize.width);
    stage.height(stageSize.height);

    drawHardware(
      layer,
      sensors,
      actuators,
      robots,
      stageSize.width,
      stageSize.height
    );
    layer.draw();
  }, [
    stageSize,
    activeLayer,
    sensorData,
    sensors,
    actuators,
    robots,
    isKonvaReady,
  ]);

  // 그리드 그리기 함수
  const drawGrid = (layer: any, stageWidth: number, stageHeight: number) => {
    if (!isKonvaReady) return;

    const Konva = konvaRef.current;
    const meterToPixelX = stageWidth / farmWidth;
    const meterToPixelY = stageHeight / farmLength;
    const bedWidth = farmWidth / bedsPerLayer;
    const bedHeight = farmLength;

    for (let i = 0; i <= bedsPerLayer; i++) {
      const x = i * bedWidth * meterToPixelX;
      const yBottom = bedHeight * meterToPixelY;
      layer.add(
        new Konva.Line({
          points: [x, 0, x, yBottom],
          stroke: "#4ade80", // 초록색 그리드 라인
          strokeWidth: 2,
        })
      );
    }
    [0, bedHeight * meterToPixelY].forEach((y) => {
      layer.add(
        new Konva.Line({
          points: [0, y, stageWidth, y],
          stroke: "#4ade80", // 초록색 그리드 라인
          strokeWidth: 2,
        })
      );
    });
  };

  // 하드웨어 그리기 함수
  const drawHardware = (
    layer: any,
    sensors: Sensor[],
    actuators: Actuator[],
    robots: Robot[],
    stageWidth: number,
    stageHeight: number
  ) => {
    if (!isKonvaReady) return;

    const Konva = konvaRef.current;
    layer.destroyChildren();
    drawGrid(layer, stageWidth, stageHeight);

    const meterToPixelX = stageWidth;
    const meterToPixelY = stageHeight;

    // 센서
    sensors?.forEach((sensorType) => {
      sensorType.positions?.forEach((pos) => {
        const pixelX = pos.x * meterToPixelX - 5;
        const pixelY = pos.y * meterToPixelY - 5;
        const visible = activeLayer === pos.layer;

        const sensorCircle = new Konva.Circle({
          x: pixelX,
          y: pixelY,
          radius: 5,
          fill: "#3b82f6", // 파란색 센서
          opacity: visible ? 1 : 0.3,
        });
        layer.add(sensorCircle);

        const label = new Konva.Text({
          x: pixelX + 10,
          y: pixelY - 10,
          text: `${sensorType.type === "temperature" ? "온도" : "습도"}: ${
            sensorType.type === "temperature"
              ? sensorData.temperature
              : sensorData.humidity
          }`,
          fontSize: 12,
          fill: "#1e293b", // 어두운 텍스트 색상
          opacity: visible ? 1 : 0.3,
        });
        layer.add(label);
      });
    });

    // 액추에이터
    const actuatorColors: Record<string, string> = {
      fan: "#22c55e",
      LED: "#eab308",
      pump: "#ef4444",
    };
    const actuatorTypes = ["pump", "LED", "fan"];

    actuatorTypes.forEach((type) => {
      const color = actuatorColors[type] || "gray";
      const items = actuators
        .filter((a) => a.type === type)
        .flatMap((a) =>
          a.positions?.map((pos) => ({
            ...pos,
            control: pos.control ?? a.control,
            type,
          }))
        );
      
      if(!items || !items[0])
        return;

      items.forEach((pos) => {
        const pixelX = pos.x * meterToPixelX - 5;
        const pixelY = pos.y * meterToPixelY - 5;
        const visible = activeLayer === pos.layer;

        let labelText = "OFF";
        let currentValue = pos.control?.default ?? 0;
        if (pos.control?.triggers?.length) {
          for (const trigger of pos.control.triggers) {
            const sensorVal = sensorData[trigger.sensor as keyof SensorData];
            // eslint-disable-next-line no-eval
            const cond = eval(
              `${sensorVal} ${trigger.operator} ${trigger.value}`
            );
            if (cond) {
              currentValue = trigger.action?.value ?? currentValue;
              const match = pos.control.options?.find(
                (opt) => opt.value === currentValue
              );
              if (match) labelText = match.label;
              break;
            }
          }
        } else {
          const match = pos.control?.options?.find(
            (opt) => opt.value === currentValue
          );
          if (match) labelText = match.label;
        }

        layer.add(
          new Konva.Rect({
            x: pixelX,
            y: pixelY,
            width: 12,
            height: 12,
            fill: color,
            opacity: visible ? 1 : 0.3,
            cornerRadius: 2,
          })
        );
        layer.add(
          new Konva.Text({
            x: pixelX + 14,
            y: pixelY - 4,
            text: `${pos.type} (${labelText})`,
            fontSize: 11,
            fill: "#1e293b", // 어두운 텍스트 색상
            opacity: visible ? 1 : 0.3,
          })
        );
      });
    });

    plants.forEach((plant) => {
      plant.positions.forEach((pos) => {
        const visible = activeLayer === pos.layer;
        if (!visible) return;

        const pixelX = pos.x * meterToPixelX;
        const pixelY = pos.y * meterToPixelY;

        // 식물 상태 평가
        const healthStatus = evaluatePlantHealth(
          plant,
          sensorData.temperature,
          sensorData.humidity
        );

        // 식물 유형에 따른 그리기
        if (plant.type === "tomato") {
          // 토마토 줄기
          layer.add(
            new Konva.Line({
              points: [pixelX, pixelY - 5, pixelX, pixelY - 15],
              stroke: "#2e7d32",
              strokeWidth: 2,
            })
          );

          // 토마토 열매
          layer.add(
            new Konva.Circle({
              x: pixelX,
              y: pixelY,
              radius: 10,
              fill: plantColors.tomato.base,
              stroke: plantColors.tomato[healthStatus],
              strokeWidth: 2,
            })
          );
        } else if (plant.type === "lettuce") {
          // 상추
          layer.add(
            new Konva.Circle({
              x: pixelX,
              y: pixelY,
              radius: 12,
              fill: plantColors.lettuce.base,
              stroke: plantColors.lettuce[healthStatus],
              strokeWidth: 2,
            })
          );
        } else if (plant.type === "pepper") {
          // 고추 줄기
          layer.add(
            new Konva.Line({
              points: [pixelX, pixelY - 5, pixelX, pixelY - 12],
              stroke: "#2e7d32",
              strokeWidth: 2,
            })
          );

          // 고추 열매
          layer.add(
            new Konva.Circle({
              x: pixelX,
              y: pixelY,
              radius: 8,
              fill: plantColors.pepper.base,
              stroke: plantColors.pepper[healthStatus],
              strokeWidth: 2,
            })
          );
        }

        // 식물 라벨 및 상태 표시
        const labelText = `${plant.name} (${plant.growthStage}%)`;
        const statusText =
          healthStatus === "optimal"
            ? "최적 환경"
            : healthStatus === "warning"
            ? "주의 필요"
            : "위험 환경";

        layer.add(
          new Konva.Text({
            x: pixelX + 15,
            y: pixelY - 15,
            text: labelText,
            fontSize: 12,
            fill: "#1e293b",
          })
        );

        layer.add(
          new Konva.Text({
            x: pixelX + 15,
            y: pixelY,
            text: statusText,
            fontSize: 10,
            fill:
              healthStatus === "optimal"
                ? "#4caf50"
                : healthStatus === "warning"
                ? "#ff9800"
                : "#f44336",
          })
        );
      });
    });
    // 로봇
    const newRobotShapes: Record<string, RobotShape> = {};
    robots.forEach((robot) => {
      const visible = activeLayer === robot.layer;
      const pixelX = robot.position.x * meterToPixelX;
      const pixelY = robot.position.y * meterToPixelY;

      const circle = new Konva.Circle({
        x: pixelX,
        y: pixelY,
        radius: 8,
        fill: "#9333ea", // 보라색 로봇
        opacity: visible ? 1 : 0.3,
      });
      const label = new Konva.Text({
        x: pixelX + 10,
        y: pixelY - 6,
        text: robot.name,
        fontSize: 12,
        fill: "#1e293b", // 어두운 텍스트 색상
        opacity: visible ? 1 : 0.3,
      });

      layer.add(circle);
      layer.add(label);

      newRobotShapes[robot.id] = { circle, label, robot };
    });
    if (JSON.stringify(robotShapes) !== JSON.stringify(newRobotShapes)) {
      setRobotShapes(newRobotShapes);
    }
  };

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ width: "100%", margin: "0 auto" }}
    >
      <div className="mb-2 text-sm flex flex-col items-center gap-2">
        {/* 기존 코드 */}

        {/* 식물 상태 정보 추가 */}
        <div className="text-gray-800 text-center font-medium mt-2 p-2 border rounded-md bg-gray-50 w-full max-w-md">
          <h4 className="font-medium mb-1">식물 생존 환경 상태</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {plants.map((plant) => {
              const status = evaluatePlantHealth(
                plant,
                sensorData.temperature,
                sensorData.humidity
              );
              return (
                <div
                  key={plant.type}
                  className={`p-1 rounded ${
                    status === "optimal"
                      ? "bg-green-100 border-green-300"
                      : status === "warning"
                      ? "bg-yellow-100 border-yellow-300"
                      : "bg-red-100 border-red-300"
                  } border`}
                >
                  <div className="font-medium">{plant.name}</div>
                  <div className="flex justify-between text-[10px]">
                    <span>
                      온도: {plant.minTemp}~{plant.maxTemp}°C
                    </span>
                    <span>현재: {sensorData.temperature}°C</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span>
                      습도: {plant.minHumidity}~{plant.maxHumidity}%
                    </span>
                    <span>현재: {sensorData.humidity}%</span>
                  </div>
                  <div
                    className={`text-[10px] mt-1 font-medium ${
                      status === "optimal"
                        ? "text-green-600"
                        : status === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {status === "optimal"
                      ? "최적 환경"
                      : status === "warning"
                      ? "주의 필요"
                      : "위험 환경"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-gray-800">
          모드:
          <label className="ml-2">
            <input
              type="radio"
              checked={mode === "random"}
              onChange={() => setMode("random")}
            />
            랜덤
          </label>
          <label className="ml-2">
            <input
              type="radio"
              checked={mode === "manual"}
              onChange={() => setMode("manual")}
            />
            수동
          </label>
        </div>

        {mode === "manual" && (
          <div className="flex flex-col gap-2 text-gray-800">
            <label>
              온도: {manualSensorData.temperature}°C
              <input
                type="range"
                min="10"
                max="40"
                step="0.1"
                value={manualSensorData.temperature}
                onChange={(e) =>
                  setManualSensorData((prev) => ({
                    ...prev,
                    temperature: Number.parseFloat(e.target.value),
                  }))
                }
                className="ml-2"
              />
            </label>
            <label>
              습도: {manualSensorData.humidity}%
              <input
                type="range"
                min="20"
                max="80"
                step="1"
                value={manualSensorData.humidity}
                onChange={(e) =>
                  setManualSensorData((prev) => ({
                    ...prev,
                    humidity: Number.parseFloat(e.target.value),
                  }))
                }
                className="ml-2"
              />
            </label>
          </div>
        )}

        <div className="text-gray-800 text-center font-medium">
          온도: {sensorData.temperature}°C / 습도: {sensorData.humidity}%
        </div>

        <div className="flex gap-2 justify-center">
          {[...Array(layers)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setActiveLayer(i + 1)}
              className={`px-3 py-1 text-xs rounded border ${
                activeLayer === i + 1
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600"
              }`}
            >
              Layer {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center items-center my-6">
        <div
          className="border border-green-300 mx-auto"
          style={{
            width: `${stageSize.width}px`,
            height: `${stageSize.height}px`,
            backgroundColor: "rgba(220, 252, 231, 0.5)",
          }}
          ref={containerRef}
        ></div>
      </div>
    </div>
  );
}
