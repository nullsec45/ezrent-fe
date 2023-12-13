import TransactionHeader from './TransactionHeader';
import TransactionMain from './TransactionMain';

export default function page() {
  return (
    <div>
      <h1 className="font-bold text-xl mb-6">Menunggu Pembayaran</h1>
      <TransactionHeader />
      <TransactionMain />
    </div>
  );
}
