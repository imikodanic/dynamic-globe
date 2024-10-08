"use client";
import dynamic from "next/dynamic";

import {sva} from "~styled-system/css";

const World = dynamic(() => import("../components/ui/globe").then((m) => m.World), {
    ssr: false,
});

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];


const getArcColor = () => {
    return colors[Math.floor(Math.random() * (colors.length - 1))] ?? "#06b6d4";
}

export default function GlobeDemo() {
    const globeConfig = {
        pointSize: 4,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: "#FFFFFF",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };
   
    const sampleArcs = [
        {
            order: 1,
            startLat: -19.885_592,
            startLng: -43.951_191,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 1,
            startLat: 28.6139,
            startLng: 77.209,
            endLat: 3.139,
            endLng: 101.6869,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 1,
            startLat: -19.885_592,
            startLng: -43.951_191,
            endLat: -1.303_396,
            endLng: 36.852_443,
            arcAlt: 0.5,
            color: getArcColor(),
        },
        {
            order: 2,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 2,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 3.139,
            endLng: 101.6869,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 2,
            startLat: -15.785_493,
            startLng: -47.909_029,
            endLat: 36.162_809,
            endLng: -115.119_411,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 3,
            startLat: -33.8688,
            startLng: 151.2093,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 3,
            startLat: 21.3099,
            startLng: -157.8581,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 3,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 4,
            startLat: 11.986_597,
            startLng: 8.571_831,
            endLat: -15.595_412,
            endLng: -56.059_18,
            arcAlt: 0.5,
            color: getArcColor(),
        },
        {
            order: 4,
            startLat: -34.6037,
            startLng: -58.3816,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.7,
            color: getArcColor(),
        },
        {
            order: 4,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 48.8566,
            endLng: -2.3522,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 5,
            startLat: 14.5995,
            startLng: 120.9842,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 5,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: -33.8688,
            endLng: 151.2093,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 5,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 48.8566,
            endLng: -2.3522,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 6,
            startLat: -15.432_563,
            startLng: 28.315_853,
            endLat: 1.094_136,
            endLng: -63.345_46,
            arcAlt: 0.7,
            color: getArcColor(),
        },
        {
            order: 6,
            startLat: 37.5665,
            startLng: 126.978,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 6,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 7,
            startLat: -19.885_592,
            startLng: -43.951_191,
            endLat: -15.595_412,
            endLng: -56.059_18,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 7,
            startLat: 48.8566,
            startLng: -2.3522,
            endLat: 52.52,
            endLng: 13.405,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 7,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 8,
            startLat: -8.833_221,
            startLng: 13.264_837,
            endLat: -33.936_138,
            endLng: 18.436_529,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 8,
            startLat: 49.2827,
            startLng: -123.1207,
            endLat: 52.3676,
            endLng: 4.9041,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 8,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.5,
            color: getArcColor(),
        },
        {
            order: 9,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 9,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.7,
            color: getArcColor(),
        },
        {
            order: 9,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: -34.6037,
            endLng: -58.3816,
            arcAlt: 0.5,
            color: getArcColor(),
        },
        {
            order: 10,
            startLat: -22.9068,
            startLng: -43.1729,
            endLat: 28.6139,
            endLng: 77.209,
            arcAlt: 0.7,
            color: getArcColor(),
        },
        {
            order: 10,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 31.2304,
            endLng: 121.4737,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 10,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 52.3676,
            endLng: 4.9041,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 11,
            startLat: 41.9028,
            startLng: 12.4964,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 11,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 31.2304,
            endLng: 121.4737,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 11,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 1.3521,
            endLng: 103.8198,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 12,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 37.7749,
            endLng: -122.4194,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 12,
            startLat: 35.6762,
            startLng: 139.6503,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.2,
            color: getArcColor(),
        },
        {
            order: 12,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 13,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 13,
            startLat: 11.986_597,
            startLng: 8.571_831,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.3,
            color: getArcColor(),
        },
        {
            order: 13,
            startLat: -22.9068,
            startLng: -43.1729,
            endLat: -34.6037,
            endLng: -58.3816,
            arcAlt: 0.1,
            color: getArcColor(),
        },
        {
            order: 14,
            startLat: -33.936_138,
            startLng: 18.436_529,
            endLat: 21.395_643,
            endLng: 39.883_798,
            arcAlt: 0.3,
            color: getArcColor(),
        },
    ];
    const classes = styles();

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.globeWrapper}>
                    <World data={sampleArcs} globeConfig={globeConfig} />
                </div>
            </div>
        </div>
    );
}

const styles = sva({
    slots: ["container", "wrapper", "overlay", "globeWrapper"],
    base: {
        container: {
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            backgroundColor: "black",
        },
        wrapper: {
            marginX: "auto",
            width: "full",
            position: "relative",
            overflow: "hidden",
            height: "full",
            px: 4,
        },
        globeWrapper: {
            position: "absolute",
            width: "full",
            height: "full",
            zIndex: 10,
        }
    }
})