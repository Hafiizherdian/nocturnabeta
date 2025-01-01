"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm }: ConfirmationModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#f0f0f0] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#292929]">
                  Konfirmasi Hapus
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-[#292929]">Apakah Anda yakin ingin menghapus soal ini?</p>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-[#62929e] text-[#f0f0f0] px-4 py-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
                    onClick={onConfirm}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="bg-[#f0f0f0] text-[#292929] px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition duration-300"
                    onClick={onClose}
                  >
                    Batal
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}