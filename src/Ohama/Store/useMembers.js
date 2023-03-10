import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

const MembersContext = createContext();

export function MembersContextProvider({ children }) {
  const [members, setMembers] = useState([
    { name: "まっち", point: 10000, isDealer: true },
    { name: "まちこ", point: 10000 },
  ]);

  useEffect(() => {
    const savedMembers = JSON.parse(window.localStorage.getItem("members"));
    if (savedMembers) {
      setMembers(savedMembers);
    }
  }, []);

  const dealer = members.find(({ isDealer }) => isDealer);

  /**
   * store members and save them to localStorage
   */
  const saveMembers = useCallback(
    (newMembers) => {
      setMembers(newMembers);
      window.localStorage.setItem("members", JSON.stringify(newMembers));
    },
    [setMembers]
  );

  const applyWon = useCallback(
    (rolls) => {
      saveMembers([
        ...members.map((member) => {
          const roll = rolls.find(
            ({ memberName }) => memberName === member.name
          );

          if (!roll) {
            return member;
          }

          member.point += roll.won;

          return member;
        }),
      ]);
    },
    [members, saveMembers]
  );

  return (
    <MembersContext.Provider
      value={{
        members,
        setMembers,
        saveMembers,
        dealer,
        applyWon,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  return useContext(MembersContext);
}
