import { ChartArea } from "chart.js";

const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea,  colorStart, colorMid, colorEnd) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export default createGradient