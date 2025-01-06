import { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [isFetching, setIsFetching] = useState(false);

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

  useEffect(() => {
    if (!loading && !error && !isFetching) {
      setIsFetching(true);
    }

    if (loading) {
      toast.info("Loading...", {
        position: "top-right",
        autoClose: 400,
        pauseOnHover: true,
      });
    } else if (error) {
      toast.error(`Error: ${error}`, {
        position: "top-right",
        pauseOnHover: true,
      });
      setIsFetching(false);
    } else {
      setIsFetching(false);
    }
  }, [from, loading, error, isFetching]);

  useEffect(() => {
    if (currencyInfo && !loading) {
      setIsFetching(false);
    }
  }, [currencyInfo, loading]);

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-dark">
      <ToastContainer />
      <div className="absolute top-10 text-center w-full">
        <h1 className="text-5xl font-extrabold text-white animate-bounce">
          K' s Currency Converter
        </h1>
      </div>

      <div className="w-full max-w-lg mx-auto p-8 border-2 border-gray-400 rounded-xl backdrop-blur-md bg-black/80 shadow-lg animate-slideInUp">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-6">
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
          <div className="relative w-full mb-6">
            <button
              type="button"
              className="absolute left-1/2 transform -translate-x-1/2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-600 hover:to-gray-400 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-all ease-in-out duration-300"
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
            className="w-full bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-400 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
