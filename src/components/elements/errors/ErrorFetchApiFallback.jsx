import { MdOutlineWifiTetheringError } from 'react-icons/md';

export default function ErrorFetchApiFallback() {
  return (
    <div className="w-full h-full grid place-content-center text-xl text-gray-400 text-center">
      <MdOutlineWifiTetheringError className="w-60 h-60 mx-auto text-gray-300" />
      <p>Terjadi masalah, tolong cek koneksi internet anda</p>
      <p>atau coba beberapa saat lagi</p>
    </div>
  );
}
