import type { SceneName } from "@/content/types";
import { DemoImage } from "./DemoImage";
import { Scene } from "./Illustrations";

type Props = {
  scene: SceneName;
  /** An authorised photo, when the restaurant has supplied one; otherwise the illustration is shown. */
  file?: string;
  alt: string;
  sizes?: string;
  className?: string;
};

/** A 4:3 visual that is an illustration today and becomes a real photo as soon as `file` is set. */
export function Visual({ scene, file, alt, sizes = "(min-width: 768px) 50vw, 100vw", className = "" }: Props) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${className}`}>
      {file ? <DemoImage file={file} alt={alt} sizes={sizes} fill className="object-cover" /> : <Scene name={scene} label={alt} className="block h-full w-full" />}
    </div>
  );
}
