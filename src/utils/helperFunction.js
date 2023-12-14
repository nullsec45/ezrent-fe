import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import idLocale from 'date-fns/locale/id';

function formatPrice(number) {
  // Mengecek apakah input adalah angka
  if (isNaN(number)) {
    return 'Invalid Input';
  }

  // Mengonversi angka ke format harga dengan titik sebagai pemisah per tiga angka
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function calculateSingleProductPrice(price, quantity, rentDurationInDays) {
  return price * quantity * rentDurationInDays;
}

function calculateRentalDurationDay(dayFrom, dayTo) {
  const INCLUDE_TODAY_SELECTED = 1;

  const rentalDurationInDay =
    Math.abs(differenceInDays(dayFrom, dayTo)) + INCLUDE_TODAY_SELECTED;

  return rentalDurationInDay;
}

function calculateSubtotalInCart(cart) {
  const subTotal = cart.reduce((acc, current) => {
    const totalPricePerProduct =
      current.quantity *
      calculateRentalDurationDay(
        new Date(current.rentFrom),
        new Date(current.rentTo)
      ) *
      current.product.price;

    return acc + totalPricePerProduct;
  }, 0);

  return subTotal;
}

function getEstimationDate(rangeDay) {
  const startDate = new Date(); // Tanggal awal (misalnya, hari ini)
  const endDate = addDays(startDate, rangeDay); // Tambahkan 1 hari ke tanggal awal

  const formattedStartDate = format(startDate, 'd MMM', { locale: idLocale });
  const formattedEndDate = format(endDate, 'd MMM', { locale: idLocale });

  return `${formattedStartDate} - ${formattedEndDate}`;
}

function calculateTotalPriceOrder(arrayOfProduct) {
  const totalPrice = arrayOfProduct.reduce((acc, current) => {
    return acc + current.subTotal;
  }, 0);
  return totalPrice;
}

function mapOrderObjectToBeSendToAPI(order) {
  const mapped = {
    ...order,
    products: order.products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      rentFrom: product.rentPeriod.from,
      rentTo: product.rentPeriod.to,
    })),
  };

  return mapped;
}

function formatISODateToLocalDate(isoDate) {
  // Parse ISO datetime menjadi objek Date
  const dateObject = parseISO(isoDate);

  // Format tanggal menggunakan date-fns
  const formattedDate = format(dateObject, 'd MMMM yyyy', { locale: idLocale }); // enLocale adalah locale bahasa Inggris

  return formattedDate;
}

function formatISODateToLocalDateTime(isoDate) {
  // Parse ISO datetime menjadi objek Date
  const dateObject = parseISO(isoDate);

  // Format tanggal dan waktu menggunakan date-fns dan locale bahasa Indonesia
  const formattedDateTime = format(dateObject, 'd MMMM yyyy HH:mm:ss', {
    locale: idLocale,
  });

  return formattedDateTime;
}

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((acc, current) => {
    return acc + current.rating;
  }, 0);

  return total / reviews.length;
};

function groupCartsByStore(carts) {
  const groupedCarts = Object.groupBy(
    carts,
    ({ product }) => product.store.name
  );

  const storeCartsArray = Object.entries(groupedCarts).map(
    ([store, items]) => ({
      store,
      items,
    })
  );

  return storeCartsArray;
}

function sortFromNewestCallback(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
}

function sortDataFromNewest(data) {
  const sortedData = data.sort(sortFromNewestCallback);

  return sortedData;
}

export {
  formatPrice,
  calculateSingleProductPrice,
  calculateRentalDurationDay,
  getEstimationDate,
  calculateTotalPriceOrder,
  mapOrderObjectToBeSendToAPI,
  formatISODateToLocalDate,
  formatISODateToLocalDateTime,
  calculateAverageRating,
  calculateSubtotalInCart,
  groupCartsByStore,
  sortDataFromNewest,
  sortFromNewestCallback,
};
