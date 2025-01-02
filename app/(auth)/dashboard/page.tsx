import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
    <div className="flex justify-between">
    <Link href="/dashboard/generate-soal" className="relative block rounded-tr-3xl border border-gray-100">

          <div className="p-4 text-center">
              <strong className="text-xl font-medium text-gray-900"> Generate </strong>

              <p className="mt-2 text-pretty text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in
                  eum vitae aliquid at sed dignissimos.
              </p>

              <span
                  className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
              >
                  Generate Soal
              </span>
          </div>
      </Link>
      <Link href="/dashboard/manage-soal" className="relative block rounded-tr-3xl border border-gray-100">

              <div className="p-4 text-center">
                  <strong className="text-xl font-medium text-gray-900"> Manage </strong>

                  <p className="mt-2 text-pretty text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in
                      eum vitae aliquid at sed dignissimos.
                  </p>

                  <span
                      className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
                  >
                      Manage Soal
                  </span>
              </div>
      </Link>
      </div>
      </>
  );
}