class AddonService {
    formatDate(date) {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        let result = new Date(date).toLocaleString('en-GB', options);
        return  result;
      }
    formatCurrency(num) {
      if (num === 0) {
        return num
      }
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
}

export default new AddonService();
