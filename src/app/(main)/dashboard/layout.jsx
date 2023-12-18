import Breadcrumbs from '@/components/Breadcrumbs';
import SmallMenu from '@/components/elements/menu/SmallMenu';

export default function Layout({ children }) {
  return (
    <div className="container px-4 lg:px-10 py-4 min-h-[700px]">
      <div>
        <Breadcrumbs
          items={[
            {
              name: 'Produk',
              link: '/products',
            },
            {
              name: 'Dashboard User',
              link: '#',
            },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          <SmallMenu />

          <main className="bg-white md:shadow-lg flex-1 md:border md:border-gray-300 p-1 md:py-6 md:px-7 rounded-xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
