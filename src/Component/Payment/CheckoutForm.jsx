import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import useAllContest from "../../Hooks/useAllContest";
import useRegisterContest from "../../Hooks/useRegisterContest";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ contestPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [allContest, refetch] = useAllContest();
  const [registerContest, reLoad] = useRegisterContest();
  const [oneContest, setOneContest] = useState([]);
  const { user, forRegisterContestId } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [creatorEmailUser, setCreatorEmailUser] = useState("");
  // console.log("contestPrice", contestPrice);
  // console.log("forRegisterContestId", forRegisterContestId);

  useEffect(() => {
    const filterContest = allContest?.find(
      (contest) => contest._id == forRegisterContestId
    );
    setOneContest(filterContest);
  }, [allContest, oneContest]);

  useEffect(() => {
    axiosSecure
      .post(`/create-payment-intent`, { contestPrice })
      .then((res) => {
        // console.log("create-payment-intent Response", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => console.log("create-payment-intent error", error));
  }, [axiosSecure, contestPrice]);

  // console.log("get data from data create-payment-intent error", clientSecret);

  const {
    contestName,
    attemptedCount,
    image,
    taskSubmissionText,
    contestDeadline,
    contestType,
    prizeMoney,
    creatorEmail,
    _id,
  } = oneContest || "";

  console.log("creatorEmail", creatorEmail);

  useEffect(() => {
    axiosSecure
      .get(`/users/update/${creatorEmail}`)
      .then((res) => {
        setCreatorEmailUser(res.data);
        console.log("setCreatorEmailUser", res);
      })
      .catch((error) => {
        console.log("setCreatorEmailUser error", error);
      });
  }, [contestName]);

  console.log("creatorEmailUser", creatorEmailUser);

  const { registeredCount } = creatorEmailUser || "";

  const forRegisterContest = {
    oldId: _id,
    contestName,
    image,
    taskSubmissionText,
    contestPrice,
    contestDeadline,
    contestType,
    prizeMoney,
    creatorEmail,
    registerEmail: user?.email,
    registerName: user?.displayName,
    registerPhotoUrl: user?.photoURL,
    participate: "Participate",
    states: "",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

    if (confirmError) {
      console.log("[confirmError]", confirmError);
      setError(confirmError.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${confirmError.message}`,
      });
    } else {
      // console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        axiosSecure
          .post("/registeredContest", forRegisterContest)
          .then((res) => {
            // console.log(res.data),
            axiosSecure
              .put(`/updateParticipationCount/id/${_id}`, {
                attemptedCount: parseInt(attemptedCount) + 1,
              })
              .then((card) => {
                // console.log(card.data.modifiedCount);
                if (card.data.modifiedCount) {
                  refetch();
                  axiosSecure
                    .put(
                      `/updateRegisterCountToTheCreator/email/${creatorEmail}`,
                      {
                        registeredCount: parseInt(registeredCount) + 1,
                      }
                    )
                    .then((res) =>
                      console.log(`updateRegisterCountToTheCreator`, res)
                    )
                    .catch((error) =>
                      console.log(
                        `updateRegisterCountToTheCreator error`,
                        error
                      )
                    );
                  // console.log("attempt updateSuccessFully");
                }
              })
              .catch((error) => {
                console.log("attempt error", error);
              });
            reLoad();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Contest register has been successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(`/dashBoard/registeredContest`);
          })
          .catch((error) => {
            console.log(error);
          });
        setTransactionId(paymentIntent.id);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-wide bg-red-400"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      <p className="text-red-600">{error}</p>
      <p className="text-green-900 font-bold ">
        Your TransactionId : {transactionId}
      </p>
    </div>
  );
};

export default CheckoutForm;
