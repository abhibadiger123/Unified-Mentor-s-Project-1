// src/components/ConfirmDialog.jsx

import {
  AlertTriangle,
  X,
  Check,
  LoaderCircle,
} from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {

  if (!isOpen) return null;


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">


      {/* Modal */}

      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800">


        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">


          <div className="flex items-center gap-3">


            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">


              <AlertTriangle
                size={25}
                className="text-red-600"
              />


            </div>


            <h2 className="text-xl font-bold text-slate-900 dark:text-white">

              {title}

            </h2>


          </div>



          <button

            onClick={onCancel}

            disabled={loading}

            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"

          >

            <X
              size={22}
              className="text-slate-500"
            />

          </button>


        </div>



        {/* Body */}

        <div className="p-6">


          <p className="text-slate-600 dark:text-slate-400 leading-7">

            {message}

          </p>


        </div>



        {/* Footer */}

        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">


          <button

            onClick={onCancel}

            disabled={loading}

            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"

          >

            {cancelText}

          </button>




          <button

            onClick={onConfirm}

            disabled={loading}

            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"

          >

            {loading ? (

              <LoaderCircle
                size={18}
                className="animate-spin"
              />

            ) : (

              <Check
                size={18}
              />

            )}


            {loading
              ? "Processing..."
              : confirmText
            }


          </button>



        </div>


      </div>


    </div>

  );

};


export default ConfirmDialog;
