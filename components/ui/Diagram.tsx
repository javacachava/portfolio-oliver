import {
  nodeKindLabels,
  type DiagramEdge,
  type DiagramNode,
  type NodeKind,
  type ProjectDiagram,
} from "@/data/diagrams";

type Variant = "full" | "compact";
type Orientation = "h" | "v";

interface Cfg {
  W: number;
  GX: number;
  GY: number;
  font: number;
  lineH: number;
  maxChars: number;
  padY: number;
}

/**
 * Cada variante tiene su geometría. En pantallas estrechas se usa la orientación vertical
 * ("v"), con nodos más angostos, para que el texto no se encoja hasta ser ilegible.
 */
const CFG: Record<`${Variant}-${Orientation}`, Cfg> = {
  "full-h": { W: 176, GX: 62, GY: 34, font: 14.5, lineH: 18, maxChars: 21, padY: 18 },
  "full-v": { W: 132, GX: 14, GY: 44, font: 13.5, lineH: 17, maxChars: 15, padY: 16 },
  "compact-h": { W: 108, GX: 30, GY: 18, font: 12.5, lineH: 15, maxChars: 13, padY: 11 },
  "compact-v": { W: 98, GX: 12, GY: 28, font: 12, lineH: 14.5, maxChars: 12, padY: 10 },
};

function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    if (current && (current + " " + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

interface Placed extends DiagramNode {
  x: number;
  y: number;
  lines: string[];
}

function layout(diagram: ProjectDiagram, variant: Variant, orientation: Orientation) {
  const cfg = CFG[`${variant}-${orientation}`];
  const lineSets = diagram.nodes.map((node) =>
    wrap(variant === "compact" ? node.short : node.label, cfg.maxChars),
  );
  const maxLines = Math.max(...lineSets.map((lines) => lines.length));
  const H = Math.max(variant === "compact" ? 40 : 52, maxLines * cfg.lineH + cfg.padY * 2);

  const cols = Math.max(...diagram.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...diagram.nodes.map((n) => n.row)) + 1;

  const placed: Placed[] = diagram.nodes.map((node, i) => {
    const main = node.col;
    const cross = node.row;
    const x = orientation === "h" ? main * (cfg.W + cfg.GX) : cross * (cfg.W + cfg.GX);
    const y = orientation === "h" ? cross * (H + cfg.GY) : main * (H + cfg.GY);
    return { ...node, x, y, lines: lineSets[i] };
  });

  const width =
    orientation === "h" ? cols * cfg.W + (cols - 1) * cfg.GX : rows * cfg.W + (rows - 1) * cfg.GX;
  const height =
    orientation === "h" ? rows * H + (rows - 1) * cfg.GY : cols * H + (cols - 1) * cfg.GY;

  return { cfg, H, placed, width, height };
}

function route(a: Placed, b: Placed, W: number, H: number, orientation: Orientation): string {
  const sameMain = a.col === b.col;
  if (orientation === "h") {
    if (sameMain) {
      const down = b.y > a.y;
      const sx = a.x + W / 2;
      return `M${sx} ${down ? a.y + H : a.y} L${sx} ${down ? b.y : b.y + H}`;
    }
    const fwd = b.x > a.x;
    const sx = fwd ? a.x + W : a.x;
    const ex = fwd ? b.x : b.x + W;
    const sy = a.y + H / 2;
    const ey = b.y + H / 2;
    const mx = (sx + ex) / 2;
    return sy === ey ? `M${sx} ${sy} L${ex} ${ey}` : `M${sx} ${sy} L${mx} ${sy} L${mx} ${ey} L${ex} ${ey}`;
  }
  if (sameMain) {
    const right = b.x > a.x;
    const sy = a.y + H / 2;
    return `M${right ? a.x + W : a.x} ${sy} L${right ? b.x : b.x + W} ${sy}`;
  }
  const fwd = b.y > a.y;
  const sy = fwd ? a.y + H : a.y;
  const ey = fwd ? b.y : b.y + H;
  const sx = a.x + W / 2;
  const ex = b.x + W / 2;
  const my = (sy + ey) / 2;
  return sx === ex ? `M${sx} ${sy} L${ex} ${ey}` : `M${sx} ${sy} L${sx} ${my} L${ex} ${my} L${ex} ${ey}`;
}

function endpoints(path: string): Array<[number, number]> {
  const nums = path.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  return [
    [nums[0], nums[1]],
    [nums[nums.length - 2], nums[nums.length - 1]],
  ];
}

function Svg({
  diagram,
  variant,
  orientation,
  labelledBy,
  decorative,
  className,
}: {
  diagram: ProjectDiagram;
  variant: Variant;
  orientation: Orientation;
  labelledBy: string;
  decorative: boolean;
  className: string;
}) {
  const { cfg, H, placed, width, height } = layout(diagram, variant, orientation);
  const byId = new Map(placed.map((n) => [n.id, n]));
  const m = 8;
  const showRefs = variant === "full";

  return (
    <svg
      viewBox={`${-m} ${-m} ${width + m * 2} ${height + m * 2}`}
      className={className}
      {...(decorative
        ? { "aria-hidden": true, focusable: "false" }
        : { role: "img", "aria-labelledby": `${labelledBy}-t ${labelledBy}-d` })}
    >
      {!decorative && (
        <>
          <title id={`${labelledBy}-t`}>{diagram.title}</title>
          <desc id={`${labelledBy}-d`}>{buildDescription(diagram)}</desc>
        </>
      )}

      {diagram.edges.map((edge: DiagramEdge, i) => {
        const a = byId.get(edge.from);
        const b = byId.get(edge.to);
        if (!a || !b) return null;
        const d = route(a, b, cfg.W, H, orientation);
        const [start, end] = endpoints(d);
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path d={d} className="dg-edge" />
            {edge.flow && (
              <path
                d={d}
                pathLength={1}
                className="dg-pulse"
                style={{ "--d": `${(i % 5) * 0.9}s` } as React.CSSProperties}
              />
            )}
            <circle cx={start[0]} cy={start[1]} r={3.5} className="dg-pad" />
            <circle cx={end[0]} cy={end[1]} r={3.5} className="dg-pad" />
          </g>
        );
      })}

      {placed.map((node, index) => {
        const cx = node.x + cfg.W / 2;
        const top = node.y + H / 2 - ((node.lines.length - 1) * cfg.lineH) / 2;
        return (
          <g key={node.id} className="dg-node" data-kind={node.kind}>
            <rect x={node.x} y={node.y} width={cfg.W} height={H} rx={3} />
            {showRefs && (
              <text x={node.x + 8} y={node.y + 12} fontSize={9} className="dg-sub">
                U{index + 1}
              </text>
            )}
            <text textAnchor="middle" fontSize={cfg.font} className="dg-label">
              {node.lines.map((line, i) => (
                <tspan key={line + i} x={cx} y={top + i * cfg.lineH} dominantBaseline="central">
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function buildDescription(diagram: ProjectDiagram): string {
  const label = (id: string) => diagram.nodes.find((n) => n.id === id)?.label ?? id;
  const links = diagram.edges.map((e) => `${label(e.from)} con ${label(e.to)}`).join("; ");
  return `${diagram.description} Conexiones: ${links}.`;
}

/**
 * Diagrama de componentes dibujado como pistas de cobre. Genera dos versiones del mismo
 * diagrama (horizontal y vertical) y el CSS muestra la que cabe en la pantalla.
 */
export default function Diagram({
  id,
  diagram,
  variant = "full",
  showLegend = variant === "full",
  decorative = false,
}: {
  id: string;
  diagram: ProjectDiagram;
  variant?: Variant;
  showLegend?: boolean;
  /** Para la versión compacta de las placas: el texto equivalente está en la propia ficha. */
  decorative?: boolean;
}) {
  const used = Array.from(new Set(diagram.nodes.map((n) => n.kind))) as NodeKind[];
  return (
    <figure>
      <div>
        <Svg
          diagram={diagram}
          variant={variant}
          orientation="h"
          labelledBy={`${id}-h`}
          decorative={decorative}
          className="hidden h-auto w-full sm:block"
        />
        <Svg
          diagram={diagram}
          variant={variant}
          orientation="v"
          labelledBy={`${id}-v`}
          decorative={decorative}
          className="mx-auto block h-auto w-full max-w-[22rem] sm:hidden"
        />
      </div>
      {showLegend && (
        <figcaption className="mt-4 space-y-2">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 t-tag">
            {used.map((kind) => (
              <li key={kind} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`inline-block h-3 w-5 rounded-[2px] border ${
                    kind === "mine"
                      ? "border-accent bg-accent/20"
                      : kind === "external"
                        ? "border-dashed border-accent-soft/70"
                        : "border-accent-soft/60"
                  }`}
                />
                {diagram.kindLabels?.[kind] ?? nodeKindLabels[kind]}
              </li>
            ))}
          </ul>
          <p className="t-small measure">{diagram.note}</p>
        </figcaption>
      )}
    </figure>
  );
}
