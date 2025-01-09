"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"; // Mengimpor usePathname
import {
  Home,
  Users,
  Calendar,
  FilePlus,
  FileEdit,
  Settings,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react"; // Mengimpor ikon dari Lucide React

// Props untuk Sidebar
interface SidebarProps {
  onClose: () => void; // Fungsi untuk menutup sidebar di mobile
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname(); // Mendapatkan path saat ini

  // Fungsi untuk mengecek apakah menu aktif
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
      {/* Bagian Atas Sidebar */}
      <div className="px-4 py-6">
        {/* Logo */}
        <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          Logo
        </span>

        {/* Menu Navigasi */}
        <ul className="mt-6 space-y-1">
          {/* Menu General */}
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                isActive("/dashboard")
                  ? "bg-indigo-100 text-indigo-700" // Style untuk menu aktif
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
              }`}
              onClick={onClose}
            >
              <Home className="h-5 w-5" />
              <span>General</span>
            </Link>
          </li>

          {/* Menu Teams (Dropdown) */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive("/dashboard/teams") ||
                  isActive("/dashboard/teams/users") ||
                  isActive("/dashboard/teams/calendar")
                    ? "bg-indigo-100 text-indigo-700" // Style untuk menu aktif
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <span>Teams</span>
                </div>
                <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
              </summary>

              {/* Submenu Teams */}
              <ul className="mt-2 space-y-1 pl-12">
                <li>
                  <Link
                    href="/dashboard/teams/users"
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                      isActive("/dashboard/teams/users")
                        ? "bg-indigo-100 text-indigo-700" // Style untuk submenu aktif
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
                    }`}
                    onClick={onClose}
                  >
                    <User className="h-5 w-5" />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/teams/calendar"
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                      isActive("/dashboard/teams/calendar")
                        ? "bg-indigo-100 text-indigo-700" // Style untuk submenu aktif
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
                    }`}
                    onClick={onClose}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Calendar</span>
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Menu Generate Soal */}
          <li>
            <Link
              href="/dashboard/generate-soal"
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                isActive("/dashboard/generate-soal")
                  ? "bg-indigo-100 text-indigo-700" // Style untuk menu aktif
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
              }`}
              onClick={onClose}
            >
              <FilePlus className="h-5 w-5" />
              <span>Generate Soal</span>
            </Link>
          </li>

          {/* Menu Manage Soal */}
          <li>
            <Link
              href="/dashboard/manage-soal"
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                isActive("/dashboard/manage-soal")
                  ? "bg-indigo-100 text-indigo-700" // Style untuk menu aktif
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
              }`}
              onClick={onClose}
            >
              <FileEdit className="h-5 w-5" />
              <span>Manage Soal</span>
            </Link>
          </li>

          {/* Menu Account (Dropdown) */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive("/dashboard/account") ||
                  isActive("/dashboard/account/details") ||
                  isActive("/dashboard/account/security")
                    ? "bg-indigo-100 text-indigo-700" // Style untuk menu aktif
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  <span>Account</span>
                </div>
                <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
              </summary>

              {/* Submenu Account */}
              <ul className="mt-2 space-y-1 pl-12">
                <li>
                  <Link
                    href="/dashboard/account/details"
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                      isActive("/dashboard/account/details")
                        ? "bg-indigo-100 text-indigo-700" // Style untuk submenu aktif
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
                    }`}
                    onClick={onClose}
                  >
                    <User className="h-5 w-5" />
                    <span>Details</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/account/security"
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                      isActive("/dashboard/account/security")
                        ? "bg-indigo-100 text-indigo-700" // Style untuk submenu aktif
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Style default
                    }`}
                    onClick={onClose}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Security</span>
                  </Link>
                </li>
                <li>
                  <form action="/">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      onClick={onClose}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* Bagian Bawah Sidebar (Profil Pengguna) */}
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white">
        <a
          href="#"
          className="flex items-center gap-3 p-4 hover:bg-gray-50"
          onClick={onClose}
        >
          <img
            alt="Profil"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs text-gray-500">
              <strong className="block font-medium">Eric Frusciante</strong>
              <span>eric@frusciante.com</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}