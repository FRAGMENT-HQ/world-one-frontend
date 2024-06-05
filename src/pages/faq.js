import Navbar from "@/components/navbar";
import FaqItems from "@/components/faqItems";
const data = [
  {
    question:
      "How much currency can I carry on an official/tourist trip abroad?",
    answer:
      "You can avail of foreign exchange up to USD 10,000 in any calendar year for tourism or private travel to any country other than Nepal and Bhutan on the basis of self-certification. You are allowed to carry currency equivalent to USD 3,000 & rest in Travel Money Card.",
  },
  {
    question: "What are the documents required to get currency/card?",
    answer:
      "The following documents are required:  Self-Attested Copy of Passport (Photograph page & address page)  Visa  Return Air Ticket  PAN Card",
  },
  {
    question:
      "How long does it take to service a forex order? Can you provide the currency/card on the same day?",
    answer:
      "While we endeavor to process and service all orders within 4-6 business hours (excluding Sunday), we recommend that you place your order 24 hours before you travel so that there is no last minute stress for you.",
  },
  {
    question: "Which bank forex card do you issue?",
    answer: "IndusInd Bank, Yes Bank & Thomas Cook India Ltd.",
  },
  {
    question: "What is the process of recharging the forex card?",
    answer:
      "The forex card can be recharged by submitting a request form through either of the following (along with the payment):  registered email id, or  by visiting into our branch",
  },
  {
    question:
      "Can I retain any of the forex that I bought for foreign travel and did not spend?",
    answer:
      "You can indefinitely retain foreign exchange up to USD 2,000 for future use. Any foreign exchange in cash in excess of this sum, is required to be surrendered within 90 days of return.",
  },
  {
    question: "What happens if I lose the forex card?",
    answer:
      "You have to block your card by calling the customer care of the bank and also inform us so that we can issue a new card after transferring the balance of your lost card into a new one.",
  },
  {
    question: "What is the process to surrender the balance on the forex card?",
    answer:
      "Need a request from the customer through register email id or visiting by the customer into our branch by filing a simple application form for refund.",
  },
  {
    question: "What modes of payment do you accept?",
    answer:
      " Electronic Fund Transfer (IMPS/NEFT/RTGS)  Bank Draft  Cheque (currency will be issued only post clearing of the cheque)",
  },
  {
    question: "Can I pay for currency/card in cash?",
    answer: "You can pay only up to INR 50,000/- in cash for a single trip",
  },
  {
    question: "What is the denomination of the currency that you will provide?",
    answer:
      "While we will strive to provide the denomination of your choice for common currencies like USD/GBP/EUR, the exact denominations depend on the availability of the currency. The choices are specifically limited for exotic currencies.",
  },
  {
    question: "Do you deliver forex to home?",
    answer:
      "Yes, after completing all formalities according to rules & regulation prescribed by the RBI.",
  },
  {
    question: "Which all cities do you deliver forex?",
    answer:
      "We deliver forex in 15 cities across India. Please see our list of branches for the city coverage.",
  },
  {
    question: "What is the minimum amount of forex that I can buy?",
    answer:
      "There is no minimum amount required to buy, however if you buy a forex card it must be loaded with a minimum of USD 200 or equivalent.",
  },
  {
    question:
      "Is there any restriction on the purposes for which I can buy forex?",
    answer:
      "Yes, the Reserve Bank of India specifies the purposes for which you can buy foreign exchange. Please contact any of our branches for your specific requirement and we will provide the appropriate details.",
  },
  {
    question:
      "Will there be any charges if I cancel the order I placed for purchase of forex?",
    answer:
      "Yes. Since the foreign exchange rate fluctuates very rapidly, it is not possible to cancel an order without incurring a charge.",
  },
  {
    question:
      "What is the Liberalised Remittances Scheme? Who is eligible to avail the facility under this scheme?",
    answer:
      "Under the Liberalised Remittance Scheme, all resident individuals, including minors, are allowed to freely remit up to USD 2,50,000 per financial year (April – March) for any permissible current or capital account transaction or a combination of both. Further, resident individuals can avail of foreign exchange facility for the purposes mentioned in Para 1 of Schedule III of FEM (CAT) Amendment Rules 2015, dated May 26, 2015, within the limit of USD 250,000 only. The Scheme was introduced on February 4, 2004, with a limit of USD 25,000. The LRS limit has been revised in stages consistent with prevailing macro and micro economic conditions. In case of remitter being a minor, the LRS declaration form must be countersigned by the minor’s natural guardian. The Scheme is not available to corporates, partnership firms, HUF, Trusts etc.",
  },
  {
    question: "What is the process to do an outward remittance?",
    answer:
      "Ideally, the remitter has to visit our branch with his/her original documents along with documents of the beneficiary. We are happy to do the required documentation at the residence of the remitter. Please contact your local branch for the support.",
  },
  {
    question:
      "Do I need to physically sign any papers for the remittance or can it be done online?",
    answer: "Both",
  },
  {
    question:
      "What are the different purposes for which I can remit money abroad?",
    answer:
      "The Reserve Bank of India specifies the purposes for which you can remit foreign exchange. Please contact any of our branches for your specific requirement and we will provide the appropriate details.",
  },
  {
    question:
      "Can I transfer money to my relative abroad for his/her living expenses?",
    answer: "Yes",
  },
  {
    question: "What are the documents required to make a remittance?",
    answer:
      "The nature of the documents changes based on the purpose of the remittance. However the following documents are required in all cases:  Complete documents of remitter & beneficiary  Bank details The other documents required for remittance of educational fees are:  University Offer Letter  University Bank Details  documents of the student Please contact any of our branches or visit our consumer portal for the documentation required for other allowed purposes.",
  },
  {
    question: "What are the payment terms when I make a remittance?",
    answer:
      "100% advance payment through :  Bank transfer (RTGS/NEFT; IMPS not allowed) Bank Draft",
  },
  {
    question:
      "When would I get the proof of the remittance, after I have made the payment?",
    answer:
      "The proof of remittance would be provided latest on the next business day by 12:00 noon",
  },
  {
    question: "In which currencies can outward remittance be made?",
    answer: "In all currencies tradable in India",
  },
  {
    question:
      "What are the timelines for processing foreign currency outward remittance?",
    answer: "Monday to Friday from 10:00 AM to 3:00 PM",
  },
  {
    question:
      "What are the commission / fees / charges and taxes applied for processing remittance?",
    answer:
      "WorldOne does not levy any charges over the forex rate. Any charges that are levied by the banks are passed to the customer on actuals (+ GST).",
  },
  {
    question: "What are Correspondent Bank Charges? Who will bear the same?",
    answer:
      "Foreign outward remittances are processed through Correspondent Banks with whom we have tie-ups. These foreign / intermediary / correspondent banks may apply a charge for processing outward remittances. These are called the Correspondent Bank charges. Correspondent Bank charges may be applied to remitter or the beneficiary basis the option selected by the remitter under “Correspondent bank charges to be borne by” field as below:  Self – Correspondent Bank charges will be borne by the remitter and will be applied post successful processing of the transaction.  Beneficiary – Correspondent Bank charges will be borne by the beneficiary and will be debited from the remittance amount sent.  Full Value – No correspondent bank charges will be charged for remittances in USD currency if this option is chosen.",
  },
  {
    question:
      "Can remittances under the LRS facility be consolidated in respect of family members?",
    answer:
      "Remittances under the facility can be consolidated in respect of close family members subject to the individual family members complying with the terms and conditions of the Scheme. However, clubbing is not permitted by other family members for capital account transactions such as opening a bank account/investment/purchase of property, if they are not the co-owners/co-partners of the investment/property/overseas bank account. Further, a resident cannot gift to another resident, in foreign currency, for the credit of the latter’s foreign currency account held abroad under LRS.",
  },
  {
    question: "Are there any restrictions on the frequency of the remittance?",
    answer:
      "There are no restrictions on the frequency of remittances under LRS. However, the total amount of foreign exchange purchased from or remitted through all sources in India during a financial year should be within the cumulative limit of USD 2,50,000. Once a remittance is made for an amount up to USD 2,50,000 during the financial year, a resident individual would not be eligible to make any further remittances under this scheme, even if the proceeds of the investments have been brought back into the country.",
  },
];

function Faqs() {
 
  return (
    <div className="mt-12 px-[5%] pb-16">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full mt-12 box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
          <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-semibold font-inherit inline-block max-w-full ">
            FAQS
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 gap-10">
          {data.map((item, index) =>  {
            
            return (
              <FaqItems
                number={index + 1}
                small={item.question}
                content={item.answer}
                oppen={true}
              />
            )
          })}
       
        </div>
      </div>
    </div>
  );
}

export default Faqs;
