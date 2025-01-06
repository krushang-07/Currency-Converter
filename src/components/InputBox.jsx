import PropTypes from "prop-types";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  amountDisable = false,
  currencyDisable = false,
  currencyOptions = [],
  onCurrencyChange,
  selectCurrency = "usd",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-800 p-4 rounded-lg text-sm flex flex-col space-y-4 ${className}`}
    >
      <div className="w-full">
        <label className="text-white/80 font-semibold mb-2 inline-block">
          {label}
        </label>
        <input
          className="outline-none w-full bg-transparent py-2 px-4 border-b-2 border-gray-500 focus:border-white focus:ring-1 focus:ring-gray-500 rounded-md text-white"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-full">
        <p className="text-white/80 font-semibold mb-2">Currency Type</p>
        <select
          className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white focus:ring-1 focus:ring-gray-500 rounded-md px-4 py-2 text-white"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option
              key={currency}
              value={currency}
              className="bg-gray-800 text-white"
            >
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Add PropTypes for validation
InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amountDisable: PropTypes.bool,
  currencyDisable: PropTypes.bool,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
  onCurrencyChange: PropTypes.func.isRequired,
  selectCurrency: PropTypes.string,
  className: PropTypes.string,
};

export default InputBox;
