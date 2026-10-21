import Link from "next/link";
import { Fish, Waves } from "@/components/Illustrations";

export default function NotFound() {
  return (
    <div className="container-site py-20 text-center md:py-28">
      <svg aria-hidden="true" viewBox="0 0 400 200" className="mx-auto h-48 w-full max-w-md">
        <rect width="400" height="200" rx="24" fill="#0A6670" stroke="#10202E" strokeWidth="4" />
        <Waves w={400} y={120} color="#FFFBF0" />
        <Fish x={200} y={90} s={0.8} r={-8} bob />
      </svg>
      <p className="eyebrow mt-8">Erreur 404</p>
      <h1 className="mt-5 text-5xl md:text-7xl">Cette page a pris le large.</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
