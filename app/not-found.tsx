import Link from "next/link";
export default function NotFound() {
  return (<div className="px-5 py-32 text-center"><h1 className="text-4xl font-semibold">Page not found</h1><p className="mt-3 text-white/65">That page does not exist or has moved.</p><Link href="/" className="mt-8 inline-block rounded-full bg-volt px-7 py-3">Back to home</Link></div>);
}
