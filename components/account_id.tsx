import { useRecoilValue } from "recoil";
import { cognito_state } from "recoil/state";

const AccountID = () => {
    const user = useRecoilValue(cognito_state);
  
    return (
      <p>{user.provider_sub}</p>
    );
  };
  
  export default AccountID;
  