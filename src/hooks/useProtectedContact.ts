export const useProtectedContact = () => {
  const encodedEmail = "c2FoaWxwYWhhdDEyQGdtYWlsLmNvbQ==";
  const encodedPhone = "KzkxOTg3MzM3MTAxMg==";

  const decode = (value: string) => atob(value);

  const openEmail = () => {
    const email = decode(encodedEmail);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    window.open(gmailUrl, "_blank");
  };

  const callPhone = () => {
    const phone = decode(encodedPhone);

    window.location.href = `tel:${phone}`;
  };

  const openWhatsApp = () => {
    const phone = decode(encodedPhone).replace("+", "");

    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return {
    openEmail,
    callPhone,
    openWhatsApp,
  };
};
