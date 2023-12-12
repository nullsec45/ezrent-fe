import SmallMenu from '@/components/elements/menu/SmallMenu';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components//ui/badge';
import { BsQuestionCircle } from 'react-icons/bs';
import { MdInfoOutline } from 'react-icons/md';
import { ChevronDown } from 'lucide-react';

export default function HistoryTransactions() {
  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            name: 'Dashboard',
            link: '#',
          },
          {
            name: 'Riwayat Transaksi',
            link: '/dashboard/history-transactions',
          },
        ]}
      />
      <div className="flex md:flex-nowrap flex-wrap gap-4 my-12 lg:px-3">
        {/* menu */}
        <SmallMenu />
        <div className="rounded-xl p-3 w-full border shadow">
          <h1 className="font-semibold text-lg mb-4">Riwayat Transaksi</h1>

          <div className="flex items-center gap-3 rounded-md  md:max-w-[30rem] lg:max-w-[50rem] w-full overflow-x-auto mb-4">
            <Button className="px-8">Semua</Button>
            <Button variant="outline" className="px-8">
              Belum Dibayar
            </Button>
            <Button variant="outline" className="px-8">
              Menunggu
            </Button>
            <Button variant="outline" className="px-8">
              Disetujui
            </Button>
            <Button variant="outline" className="px-8">
              Ditolak
            </Button>
          </div>

          <div className="w-full p-3 mb-3 rounded-lg border">
            <div className="flex justify-between mb-3">
              <div className="flex items-center flex-wrap gap-3">
                <h1 className="font-semibold text-base">EZRent Invoice</h1>
                <Badge variant={'warning'}>Belum Dibayar</Badge>
                <Badge variant={'secondary'} className={'font-normal px-1'}>
                  <MdInfoOutline className="inline mr-1" />
                  Bayar Sebelum: {''}
                  <span className="inline font-medium">25 November 2023</span>
                </Badge>
              </div>
              <BsQuestionCircle className="text-gray-500" />
            </div>
            <div className="flex md:flex-nowrap flex-wrap gap-2">
              <div className="w-full md:text-base text-sm p-3 bg-gray-200 rounded-md">
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">Total: </h1>
                  <h2 className="font-medium">Rp 150.000</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Tanggal Transaksi:{' '}
                  </h1>
                  <h2 className="font-medium">23 November 2023</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Metode Pembayaran:{' '}
                  </h1>
                  <h2 className="font-normal">BCA Virtual Account</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    No. Virtual Account:{' '}
                  </h1>
                  <h2 className="font-normal">
                    {' '}
                    <span className="inline font-semibold">09878723</span> |
                    Atas Nama:{' '}
                    <span className="inline font-semibold">Irma maulana</span>{' '}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-between  w-full md:w-fit">
                <div className="md:block hidden">
                  <h1>Logo bank</h1>
                </div>
                <div className="flex items-center w-full gap-2 md:mt-0 mt-1.5">
                  <Button className="px-5 w-full" variant="outline">
                    Batalkan
                  </Button>
                  <Button className="px-7 w-full">Bayar</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-3 mb-3 rounded-lg border">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-3">
                <h1 className="font-semibold text-base">EZRent Invoice</h1>
                <Badge variant={'success'}>Dibayar</Badge>
              </div>
            </div>
            <div className="flex md:flex-nowrap flex-wrap gap-2">
              <div className="w-full p-3 md:text-base text-sm bg-gray-200 rounded-md">
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">Total: </h1>
                  <h2 className="font-medium">Rp 150.000</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Tanggal Transaksi:{' '}
                  </h1>
                  <h2 className="font-medium">23 November 2023</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Metode Pembayaran:{' '}
                  </h1>
                  <h2 className="font-normal">BCA Virtual Account</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    No. Virtual Account:{' '}
                  </h1>
                  <h2 className="font-normal">
                    {' '}
                    <span className="inline font-semibold">09878723</span> |
                    Atas Nama:{' '}
                    <span className="inline font-semibold">Irma maulana</span>{' '}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-between  w-full md:w-fit">
                <div className="md:block hidden">
                  <h1>Logo bank</h1>
                </div>
                <div className="flex items-center w-full gap-2 md:mt-0 mt-1.5">
                  <Button className="px-5 w-full" variant="outline">
                    Lihat Rincian
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-3 mb-3 rounded-lg border">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-3">
                <h1 className="font-semibold text-base">EZRent Invoice</h1>
                <Badge
                  variant={'secondary'}
                  className={'text-white bg-gray-400 hover:bg-gray-400/80'}
                >
                  Meunggu
                </Badge>
              </div>
            </div>
            <div className="flex md:flex-nowrap flex-wrap gap-2">
              <div className="w-full p-3 md:text-base text-sm bg-gray-200 rounded-md">
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">Total: </h1>
                  <h2 className="font-medium">Rp 150.000</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Tanggal Transaksi:{' '}
                  </h1>
                  <h2 className="font-medium">23 November 2023</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Metode Pembayaran:{' '}
                  </h1>
                  <h2 className="font-normal">BCA Virtual Account</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    No. Virtual Account:{' '}
                  </h1>
                  <h2 className="font-normal">
                    {' '}
                    <span className="inline font-semibold">09878723</span> |
                    Atas Nama:{' '}
                    <span className="inline font-semibold">Irma maulana</span>{' '}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-between  w-full md:w-fit">
                <div className="md:block hidden">
                  <h1>Logo bank</h1>
                </div>
                <div className="flex items-center w-full gap-2 md:mt-0 mt-1.5">
                  <Button className="px-5 w-full" variant="outline">
                    Lihat Rincian
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-3 mb-3 rounded-lg border">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-3">
                <h1 className="font-semibold text-base">EZRent Invoice</h1>
                <Badge variant={'destructive'}>Ditolak</Badge>
              </div>
            </div>
            <div className="flex md:flex-nowrap flex-wrap gap-2">
              <div className="w-full p-3 md:text-base text-sm bg-gray-200 rounded-md">
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">Total: </h1>
                  <h2 className="font-medium">Rp 150.000</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Tanggal Transaksi:{' '}
                  </h1>
                  <h2 className="font-medium">23 November 2023</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    Metode Pembayaran:{' '}
                  </h1>
                  <h2 className="font-normal">BCA Virtual Account</h2>
                </div>
                <div className="flex my-1.5 items-center gap-1">
                  <h1 className="text-base font-light mr-1">
                    No. Virtual Account:{' '}
                  </h1>
                  <h2 className="font-normal">
                    {' '}
                    <span className="inline font-semibold">09878723</span> |
                    Atas Nama:{' '}
                    <span className="inline font-semibold">Irma maulana</span>{' '}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-between  w-full md:w-fit">
                <div className="md:block hidden">
                  <h1>Logo bank</h1>
                </div>
                <div className="flex items-center w-full gap-2 md:mt-0 mt-1.5">
                  <Button className="px-5 w-full" variant="outline">
                    Lihat Rincian
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-1.5 flex justify-center">
            <Button variant="outline" className="px-10">
              Selengkapnya
              <ChevronDown size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
