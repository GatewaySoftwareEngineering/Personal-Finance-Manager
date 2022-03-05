export const getWalletData = () => {
  return new Promise((resolve) => {
    const walletData = localStorage.getItem("wallet");
    resolve(walletData);
  });
};
