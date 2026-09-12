import { SubnetVisualizer } from "@/components/subnet-visualizer";

export const metadata = { title: "تصویرسازی زیرشبکه" };

export default function SubnetVizPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Network Tool</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">Subnet Visualization</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          See how CIDR splitting divides a network into subnets — with binary breakdown and animated block sizes.
        </p>
      </div>
      <SubnetVisualizer />
    </div>
  );
}