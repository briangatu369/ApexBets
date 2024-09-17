import BetHistory from "../../../../Components/BetHistory/BetHistory";
import BetHistoryElement from "../../../../Components/BetHistory/BetHistoryElement";
import { useGetBetHistory } from "../../../../Hooks/useGetBetHistory";

const DiceBetHistory = ({ isOpen, onOpen, onOpenChange }) => {
  const { betHistory, getBetHistory, isLoading, currentPage } =
    useGetBetHistory("/games/dice/bethistory", isOpen);

  return (
    <BetHistory
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      isLoading={isLoading}
      fetchMore={() => {
        getBetHistory();
      }}
    >
      {isLoading && currentPage === 1 ? (
        <div className="w-full flex flex-col items-center gap-2 py-4 ">
          <div className="spinner w-6 h-6 "></div>
          <h4 className="italic">Loading...</h4>
        </div>
      ) : betHistory.length <= 0 ? (
        <div className="text-white text-center py-3 underline">
          <h4 className="tracking-wide">No bet history found</h4>
        </div>
      ) : (
        betHistory.map((bet) => {
          let {
            stake: { amount, accountType },
            _id,
            mode,
            status,
            payout,
            multiplier,
            createdAt,
          } = bet;

          status = status === "WON" ? true : false;

          return (
            <BetHistoryElement
              key={_id}
              stake={amount}
              account={accountType}
              mode={mode}
              gameStatus={status}
              payout={payout}
              multiplier={multiplier}
              createdAt={createdAt}
            />
          );
        })
      )}
    </BetHistory>
  );
};

export default DiceBetHistory;
