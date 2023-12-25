import SelectedToken from "./SelectedToken";

const AccountBody = ({ onSearch }: any) => {

    return <div className="mt-[27px] flex">
        <SelectedToken onSearch={onSearch} />
    </div>
}

export default AccountBody;