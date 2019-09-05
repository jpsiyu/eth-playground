pragma solidity >=0.4.22 <0.6.0;
//pragma solidity  ^0.4.21;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
        return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
}

interface tokenRecipient { 
    function receiveApproval(address _from, uint256 _value, address _token, bytes calldata  _extraData) external; 
}

contract Base {
    using SafeMath for uint256;

    uint public createDay;
    
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setOwner(address _newOwner)  external  onlyOwner {
        require(_newOwner != address(0x0));
        owner = _newOwner;
    }

    bool public IsStopped = false;

    function setStop(bool isStop) external onlyOwner {
        IsStopped = isStop;
    }

    modifier onlyNoStopped {
        require(!IsStopped);
        _;
    }

    address public admin;

    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    function setAdmin(address _newAdmin)  external  onlyAdmin {
        require(_newAdmin != address(0x0));
        admin = _newAdmin;
    }
    
    mapping(address => bool) public blacklistOf;   

    function addBlacklist(address _Addr) external onlyAdmin {
        require (_Addr != address(0x0));  
        blacklistOf[_Addr] = true;
    }  

    function delBlacklist(address _Addr) external onlyAdmin {
        require (_Addr != address(0x0));  
        blacklistOf[_Addr] = false;
    }
    
    function isBlacklist(address _Addr) public view returns(bool _result) {  
        require (_Addr != address(0x0));  
        _result = (now <  (createDay + 90 days) * (1 days)) && blacklistOf[_Addr];
    }

}

contract TokenERC20 is Base {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Burn(address indexed from, uint256 value);
     
    //Fix for short address attack against ERC20
	modifier onlyPayloadSize(uint size) {
		assert(msg.data.length == size + 4);
		_;
	}

    // modifier onlyPayloadSize(uint size) {
    //     require(!(msg.data.length < size + 4));
    //     _;
    // }

    // function _transfer(address _from, address _to, uint _value) internal {
    function _transfer(address _from, address _to, uint _value) internal onlyNoStopped returns (bool success) {
        require(_to != address(0x0));
        require(!isBlacklist(_from));
        require(!isBlacklist(_to));
        require(balanceOf[_from] >= _value);
        balanceOf[_from] = balanceOf[_from].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    function transfer(address _to, uint256 _value)  onlyPayloadSize(2*32) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) onlyPayloadSize(2*32) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns (bool success) 
    {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        }
    }

    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);                               // Check if the sender has enough
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);              // Subtract from the sender
        totalSupply = totalSupply.sub(_value);                                  // Updates totalSupply
        emit Burn(msg.sender, _value);
        return true;
    }

    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(1 == 2);
        emit Burn(_from, _value);
        return false;
    }
}


// contract Erc20TokenInterface {
//     // function totalSupply() public view returns (uint);
//     function balanceOf(address tokenOwner) public view returns (uint balance);
//     // function allowance(address tokenOwner, address spender) public view returns (uint remaining);
//     // function transfer(address to, uint tokens) public returns (bool success);
//     // function approve(address spender, uint tokens) public returns (bool success);
//     // function transferFrom(address from, address to, uint tokens) public returns (bool success);
//     // event Transfer(address indexed from, address indexed to, uint tokens);
//     // event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
//  }

contract TokenBeiBaoBi is TokenERC20 {
    
    //function TokenBeiBaoBi(address _owner, address _admin) public {
    //function TokenBeiBaoBi(address _owner, address _admin, address[] memory _users, uint256[] memory _amounts) public {
    //function TokenBeiBaoBi(address _owner, address _admin) public {
    constructor(address _owner, address _admin) public {
        require(_owner != address(0x0));
        require(_admin != address(0x0));
        owner = _owner;
        admin = _admin;

        //https://etherscan.io/address/0x3b81d9f7afb4d4cab0fba191b3831219a0469b82
        
        totalSupply = 1000000000 * 10 ** uint256(decimals);     // Update total supply with the decimal amount

        // uint toOwner =  47500000 * 10 ** uint256(decimals);
        // uint toAdmin =   2500000 * 10 ** uint256(decimals);        
        // balanceOf[address(this)] = totalSupply - toOwner - toAdmin;                 // Give the creator all initial tokens
        // balanceOf[owner] = toOwner;                             // Give the creator all initial tokens
        // balanceOf[admin] = toAdmin;                             // Give the creator all initial tokens
        balanceOf[address(this)] = totalSupply;
        //loadOldTokenUserAmount(_users, _amounts);             //new code

        name = "BeiBaoBiToken";                                 // Set the name for display purposes
        symbol = "BBB";                                         // Set the symbol for display purposes
        createDay = now / (1 days);
    }


    //function loadOldTokenUserAmount(address[]  _users) public onlyOwner{
    // function loadOldTokenUserAmount(address[] memory _users, uint256[] memory _amounts) private {
    //     address OldTokenAddress = 0x3B81d9F7Afb4d4cAB0fbA191b3831219a0469B82;       //写死，
    //     Erc20TokenInterface ot = Erc20TokenInterface(OldTokenAddress);
    //     for(uint i = 0; i < _users.length; i ++){
    //         address addr = _users[i];
    //         uint amount = ot.balanceOf(addr);
    //         require(addr != address(0x0));
    //         balanceOf[addr] = amount;
    //     }

    //     balanceOf[address(this)] = ot.balanceOf(OldTokenAddress);                            //需要
    // }

    function loadOldTokenUserAmount(address[] memory _users, uint256[] memory _amounts) public onlyOwner{
    //function loadOldTokenUserAmount(address[] memory _users, uint256[] memory _amounts) private {
     //function loadOldTokenUserAmount(address[] memory _users, uint256[] memory _amounts) public onlyOwner {
        require(_users.length == _amounts.length);
        for(uint i = 0; i < _users.length; i ++){
            address addr = _users[i];
            uint amount = _amounts[i];
            require(addr != address(0x0));
            require(amount > 0);
            // balanceOf[addr] = amount;
            require(_transfer(address(this), addr, amount));
        }
    }

    function loadUserAmount(address _user, uint256 _amount) public onlyOwner{
            require(_user != address(0x0));
            require(_amount > 0);
            // balanceOf[addr] = amount;
            require(_transfer(address(this), _user, _amount));
    }


    function batchTransfer1(address[] calldata  _tos, uint256 _amount) external  {
        require(_batchTransfer1(msg.sender, _tos, _amount));
    }

    function _batchTransfer1(address _from, address[] memory _tos, uint256 _amount) internal returns (bool _result) {
        require(_amount > 0);
        require(_tos.length > 0);
        for(uint i = 0; i < _tos.length; i++){
            address to = _tos[i];
            require(to != address(0x0));
            require(_transfer(_from, to, _amount));
        }
        _result = true;
    }

    function batchTransfer2(address[] calldata  _tos, uint256[] calldata  _amounts) external  {
        require(_batchTransfer2(msg.sender, _tos, _amounts));
    }

    function _batchTransfer2(address _from, address[] memory _tos, uint256[] memory _amounts) internal returns (bool _result)  {
        require(_amounts.length > 0);
        require(_tos.length > 0);
        require(_amounts.length == _tos.length );
        for(uint i = 0; i < _tos.length; i++){
            require(_tos[i] != address(0x0) && _amounts[i] > 0);
            require(_transfer(_from, _tos[i], _amounts[i]));
        }
        _result = true;
    }

    mapping(uint => uint) public dayFillOf;    //day => amount

    function getDay(uint _time) public pure returns (uint _day)
    {
        _day = _time.div(1 days);
    }

    // mapping(uint => uint) public powerAmountOf;    //power => amount

    function getDayMaxAmount(uint _day) public view returns (uint _amount)
    {
        require(_day >= createDay);
        uint AddDays = _day - createDay;
        uint Power = AddDays / 200;

        //_amount = 400000.mul(10 ** uint(decimals)).mul (9 ** Power).div(10 ** Power);
        //_amount = 400000  * (10 ** uint(decimals)) * (9 ** Power) / (10 ** Power);

        _amount = 400000;
        _amount = _amount.mul(10 ** uint(decimals));    //使用这种方法不会溢出
        for(uint i = 0; i < Power; i++)
        {
            require(_amount > 0);
            _amount = _amount * 9 / 10;
        }
    }

    function getDayIssueAvaAmount(uint _day) public view returns (uint _toUserAmount)
    {
        uint max = getDayMaxAmount(_day);
        uint fill = dayFillOf[_day];
        require(max > fill);
        _toUserAmount = (max - fill);
    }
    
    event OnIssue1(uint indexed _day, address[]  _tos, uint256 _amount, address _sender);

    function issue1(uint _day, address[] calldata  _tos, uint256 _amount) external onlyOwner 
    {
        //require(msg.sender == tx.origin);
        require(_day * (1 days) <= now);
        require(_amount > 0);
        for(uint i = 0; i < _tos.length; i++){
            address to = _tos[i];
            require(to != address(0x0));

            dayFillOf[_day] = dayFillOf[_day].add(_amount);
            uint DayMaxAmount = getDayMaxAmount(_day);
            require( dayFillOf[_day] < DayMaxAmount);

            require(_transfer(address(this), to, _amount));
        }
        emit OnIssue1(_day, _tos, _amount, msg.sender);
    }

    event OnIssue2(uint indexed _day, address[]  _tos, uint256[]  _amounts, address _sender);

    function issue2(uint _day, address[] calldata  _tos, uint256[] calldata  _amounts) external onlyOwner 
    {
        //require(msg.sender == tx.origin);
        require(_day * (1 days) <= now);
        require(_tos.length == _amounts.length);
        for(uint i = 0; i < _tos.length; i++){
            address to = _tos[i];
            require(to != address(0x0));
            require(_amounts[i] > 0);

            dayFillOf[_day] = dayFillOf[_day].add(_amounts[i]);
            uint DayMaxAmount = getDayMaxAmount(_day);
            require(dayFillOf[_day] <= DayMaxAmount);

            require(_transfer(address(this), to,  _amounts[i]));
        }
        emit OnIssue2(_day, _tos, _amounts, msg.sender);
    }

    mapping(uint8 =>  uint256) TeamFillAmount;      //团队获奖分配资金

    event OnMotivate(uint8 indexed _number, address indexed _member, uint256 _amount,  address _sender);

    function motivateTeam(uint8 _number, address _member, uint256 _amount) external onlyOwner
    {     
        uint MaxAmount = 10000000;        //7，	团队激励，1亿，每90天释放1%，2.5年释放完。Owner执行。
        MaxAmount = MaxAmount.mul(10 ** uint(decimals));
        require((now / (1 days) - createDay) / 90 >= _number);
        require(_number < 10);
        require(_amount > 0);
        require( TeamFillAmount[_number]  + _amount <= MaxAmount);

        require(_transfer(address(this), _member,  _amount));
        TeamFillAmount[_number] =  TeamFillAmount[_number] + _amount;

        emit OnMotivate(_number, _member, _amount,  msg.sender);
    }

    uint256 CommunityFillAmount = 0;

    function motivateCommunity(address _member, uint256 _amount) external onlyOwner
    {     
        uint MaxAmount = 45000000;         //8，	社区激励，0.45亿，可一次或多次释放。Owner执行。
        MaxAmount = MaxAmount.mul(10 ** uint(decimals));
        require(_amount > 0);
        require( CommunityFillAmount + _amount <= MaxAmount);
        require(_transfer(address(this), _member,  _amount));
        CommunityFillAmount =  CommunityFillAmount + _amount;

        emit OnMotivate(100, _member, _amount,  msg.sender);
    }

    uint256 LegalFillAmount = 0;

    function motivateLegal(address _member, uint256 _amount) external onlyOwner
    {     
        uint MaxAmount = 5000000;                   //9，	法务激励，0.05亿，可一次或多次释放。Owner执行。
        MaxAmount = MaxAmount.mul(10 ** uint(decimals));
        require(_amount > 0);
        require( LegalFillAmount + _amount <= MaxAmount);
        require(_transfer(address(this), _member,  _amount));
        LegalFillAmount =  LegalFillAmount + _amount;

        emit OnMotivate(200, _member, _amount,  msg.sender);
    }

    
    function() payable external {
        // require(1 == 2);    //selfdestruct(_to);
    }

}
