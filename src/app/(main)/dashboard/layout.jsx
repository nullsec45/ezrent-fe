import SmallMenu from '@/components/elements/menu/SmallMenu';

export default function Layout({ children }) {
  return (
    <div className="container flex flex-col lg:flex-row gap-6 my-12 px-3">
      {/* menu */}
      <SmallMenu />
      {/* menu */}

      {/* update profile */}
      <main className="bg-white shadow-lg flex-1 border border-gray-300 py-6 px-7 rounded-xl">
        {children}
      </main>
    </div>
  );
}
