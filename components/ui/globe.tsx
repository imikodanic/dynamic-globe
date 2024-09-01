"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend,type Object3DNode, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, PerspectiveCamera, Scene } from "three";
import ThreeGlobe from "three-globe";

import countries from "../../data/globe.json";
declare module "@react-three/fiber" {
    // It is used but IDE does not recognize it
    interface ThreeElements {
        threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
    }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const minZoomDistance = 200;
const maxZoomDistance = 700;

interface Position {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
}

export interface GlobeConfig {
    pointSize?: number;
    globeColor: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight: string;
    directionalLeftLight: string;
    directionalTopLight: string;
    pointLight: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
}

interface WorldProperties {
    globeConfig: GlobeConfig;
    data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProperties) {
    const [globeData, setGlobeData] = useState<
        | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
    }[]
        | null
    >();

    const globeReference = useRef<ThreeGlobe | null>(null);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    useEffect(() => {
        if (globeReference.current) {
            _buildData();
            _buildMaterial();
        }
    }, [globeReference.current]);

    const _buildMaterial = () => {
        if (!globeReference.current) return;

        const globeMaterial = globeReference.current.globeMaterial() as unknown as {
            color: Color;
            emissive: Color;
            emissiveIntensity: number;
            shininess: number;
        };
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.1;
        globeMaterial.shininess = globeConfig.shininess ?? 0.9;
    };

    const _buildData = () => {
        const arcs = data;
        const points = [];
        for (const arc of arcs) {
            const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
                lat: arc.startLat,
                lng: arc.startLng,
            }, {
                size: defaultProps.pointSize,
                order: arc.order,
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        // remove duplicates for same lat and lng
        const filteredPoints = points.filter(
            (v, index, a) =>
                a.findIndex((v2) =>
                    ["lat", "lng"].every(
                        (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
                    )
                ) === index
        );

        setGlobeData(filteredPoints);
    };

    useEffect(() => {
        if (globeReference.current && globeData) {
            globeReference.current
                .hexPolygonsData(countries.features)
                .hexPolygonResolution(3)
                .hexPolygonMargin(0.7)
                .showAtmosphere(defaultProps.showAtmosphere)
                .atmosphereColor(defaultProps.atmosphereColor)
                .atmosphereAltitude(defaultProps.atmosphereAltitude)
                .hexPolygonColor(() => {
                    return defaultProps.polygonColor;
                });
            startAnimation();
        }
    }, [globeData]);

    const startAnimation = () => {
        if (!globeReference.current || !globeData) return;

        globeReference.current
            .arcsData(data)
            .arcStartLat((d) => (d as { startLat: number }).startLat)
            .arcStartLng((d) => (d as { startLng: number }).startLng)
            .arcEndLat((d) => (d as { endLat: number }).endLat)
            .arcEndLng((d) => (d as { endLng: number }).endLng)
            // @ts-expect-error -- don't know how to fix this
            .arcColor((object: never) => (object as { color: string }).color)
            .arcAltitude((object) => {
                return (object as { arcAlt: number }).arcAlt;
            })
            .arcStroke(() => {
                return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)] ?? 1;
            })
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((object) => (object as { order: number }).order)
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeReference.current
            .pointsData(data)
            .pointColor((object) => (object as { color: string }).color)
            .pointsMerge(true)
            .pointAltitude(0)
            .pointRadius(2);

        globeReference.current
            .ringsData([])
            // @ts-expect-error -- don't know how to fix this
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
            .ringColor((object: never) => (t: never) => object.color(t))
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
            );
    };

    useEffect(() => {
        if (!globeReference.current || !globeData) return;

        const interval = setInterval(() => {
            if (!globeReference.current) return;
            numbersOfRings = genRandomNumbers(
                0,
                data.length,
                Math.floor((data.length * 4) / 5)
            );

            globeReference.current.ringsData(
                globeData.filter((_d, index) => numbersOfRings.includes(index))
            );
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [globeReference.current, globeData]);

    return (
        <>
            <threeGlobe ref={globeReference} />
        </>
    );
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0xff_aa_ff, 0);
    }, []);

    return <></>;
}

export function World(properties: WorldProperties) {
    const { globeConfig } = properties;
    const scene = new Scene();
    const aspect = window.innerWidth / window.innerHeight;

    return (
        <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 50, 1800)}>
            <WebGLRendererConfig />
            <ambientLight color={globeConfig.ambientLight} />
            <directionalLight
                color={globeConfig.directionalLeftLight}
            />
            <directionalLight
                color={globeConfig.directionalTopLight}
            />
            <pointLight
                color={globeConfig.pointLight}
            />
            <Globe {...properties} />
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={minZoomDistance}
                maxDistance={maxZoomDistance}
                autoRotateSpeed={1}
                autoRotate={true}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}

export function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([\da-f])([\da-f])([\da-f])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r: string, g: string, b: string) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
    return result
        ? {
            r: Number.parseInt(result[1] ?? "F", 16),
            g: Number.parseInt(result[2] ?? "F", 16),
            b: Number.parseInt(result[3] ?? "F", 16),
        }
        : undefined;
}

export function genRandomNumbers(min: number, max: number, count: number) {
    const array: number[] = [];
    while (array.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (!array.includes(r)) array.push(r);
    }

    return array;
}
