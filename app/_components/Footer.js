function Footer() {
  return (
    <footer className="h-[60px] w-full flex items-center justify-center">
      <p className="text-sm text-gray-500 font-medium">
        Developed by Ridwan @{new Date().getFullYear()}.
      </p>
    </footer>
  );
}

export default Footer;
