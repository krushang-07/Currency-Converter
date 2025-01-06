import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import "./index.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const { data: currencyInfo, loading, error } = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  if (loading) {
    return (
      <div
        className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat animate-fadeIn"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/27920235/pexels-photo-27920235/free-photo-of-real-estate-business-finance-background-template-cross-section-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="text-center text-white animate-bounce z-10">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
          <h2 className="text-3xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/27920235/pexels-photo-27920235/free-photo-of-real-estate-business-finance-background-template-cross-section-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="text-center text-white text-2xl font-bold z-10">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/27920235/pexels-photo-27920235/free-photo-of-real-estate-business-finance-background-template-cross-section-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="absolute top-10 text-center w-full">
        <h1 className="text-4xl font-extrabold text-white animate-bounce">
          KS Currency Converter
        </h1>
      </div>

      <div className="w-full max-w-lg mx-auto p-6 border-2 border-white rounded-xl backdrop-blur-md bg-black/50 shadow-lg animate-slideInUp">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setFrom(currency);
                setConvertedAmount(0); // Reset converted amount
              }}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              className="input-box"
            />
          </div>
          <div className="relative w-full h-0.5 mb-4">
            <button
              type="button"
              className="absolute left-1/2 transform -translate-x-1/2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all ease-in-out duration-300"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
              className="input-box"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-300 hover:from-green-300 hover:to-green-500 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
