const verifyToken = async (accessToken) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();
  if (result.statusCode === 200) return result.data;

  return null;
};

const isUserInAuthPage = (request) => {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/auth')) return true;
  return false;
};

const isUserInMainPage = (request) => {
  const { pathname } = request.nextUrl;
  const mainPageRotes = ['/direct-rent', '/checkout', '/dashboard', '/store'];

  if (
    pathname.startsWith('/direct-rent') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/store')
  )
    return true;
  return false;
};

export { verifyToken, isUserInAuthPage, isUserInMainPage };
