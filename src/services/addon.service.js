class AddonService {
    formatDate(date) {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        let result = new Date(date).toLocaleString('en-GB', options);
        return  result;
      }
}

export default new AddonService();
