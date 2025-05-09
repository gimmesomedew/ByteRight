const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl transition-all duration-300",
    secondary: "bg-secondary/10 hover:bg-secondary/20 text-secondary font-medium",
    ghost: "hover:bg-primary/5 transition-all duration-300",
    outline: "border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary/5 font-medium",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-6",
    lg: "h-12 px-8 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export { Button };
