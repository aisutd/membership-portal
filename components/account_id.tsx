import { useRecoilValue } from "recoil";
import { cognito_state } from "recoil/state";

const AccountID = () => {
    const user = useRecoilValue(cognito_state);
  
    return (
      <p>User ID: {user.provider_sub.substring(0, 8)}...</p>
    );
  };
  
  export default AccountID;
  