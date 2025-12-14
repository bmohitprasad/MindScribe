import { SignupInput } from "@bmohitp/medium-commonfile";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Home = () => {
  const [showComponents, setShowComponents] = useState<"signin" | "signup">("signin");

  const handleClick = () => {
    setShowComponents((mode) => (mode === "signup" ? "signin" : "signup"));
  };

  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${showComponents === "signup" ? "signup" : "signin"}`,
        postInputs
      );

      const { tokenName, name, userId } = response.data;

      localStorage.setItem("token", tokenName);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", userId);

      navigate("/blogs");
    } catch (e: any) {
      if (e.response) {
        switch (e.response.status) {
          case 400:
            setError("Invalid credentials. Please check your input.");
            break;
          case 401:
            setError("Unauthorized! Incorrect username or password.");
            break;
          case 500:
            setError("Server error! Please try again later.");
            break;
          default:
            setError(e.response.data.message || "Something went wrong.");
        }
      } else {
        setError("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1E1E]">
      <div className="max-w-3xl w-full py-24 px-8 bg-[#2A2A2A] shadow-md border border-[#444] hover:shadow-lg transition-all rounded-lg flex">
        
        {/* LEFT PANEL */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl text-[#F0F0F0] font-bold">
            {showComponents === "signin" ? "Welcome back." : "Join Medium."}
          </h2>

          <p className="text-[#B0B0B0] mt-2">
            {showComponents === "signin"
              ? "Sign in to access your personalized homepage, follow authors and topics you love, and clap for stories that matter to you."
              : "Create an account to discover new ideas, publish your own stories, and engage with a community that values thoughtful writing."}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-center text-[#F0F0F0] text-xl font-bold mb-4">
            Sign {showComponents === "signin" ? "in" : "up"} with email
          </div>

          {showComponents === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Your Name"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                })
              }
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="yourmail@email.com"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                username: e.target.value
              })
            }
          />

          <LabelledInput
            label="Password"
            type="password"
            placeholder="**********"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            }
          />

          <div className="mt-4">
            <div className="flex justify-center h-auto w-full rounded-xl bg-teal-600">
              <button
                onClick={sendRequest}
                className="text-white w-full font-semibold p-2 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : showComponents === "signup" ? (
                  "Sign Up"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {error && (
              <div className="flex justify-center">
                <p className="mt-2 text-red-500 text-sm">{error}</p>
              </div>
            )}
          </div>

          <p className="text-[#B0B0B0] text-sm text-center mt-6">
            {showComponents === "signin"
              ? "New to Medium? "
              : "Already have an account? "}
            <button
              onClick={handleClick}
              className="text-teal-600 font-semibold"
            >
              {showComponents === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label className="text-[#B0B0B0] block mb-2 text-sm font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-color1 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
