// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title Smart Contract to retrive deal data
/// @author Bhumi Sadariya

import {MarketAPI} from "./MarketAPI.sol";
import {MarketTypes} from "./MarketTypes.sol";
import "./DAO.sol";

contract DealData {
    DAO dao = DAO(0xa60C7e5D0cCec0B28E5e6a57EE30C48Bfa29C5C6);

    /// @return the data commitment and size of a deal proposal for the requested data in the DAO.
    function getStorageSize(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealDataCommitmentReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);
        MarketTypes.GetDealDataCommitmentParams memory params = MarketTypes
            .GetDealDataCommitmentParams(d_id);
        MarketTypes.GetDealDataCommitmentReturn
            memory response = marketApiInstance.get_deal_data_commitment(
                params
            );
        return response;
    }

    /// @return the client of a deal proposal for the requested data in the DAO.
    function getStorageDealClient(uint256 _id)
        public
        view
        returns (string memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);
        MarketTypes.GetDealClientParams memory params = MarketTypes
            .GetDealClientParams(d_id);

        MarketTypes.GetDealClientReturn memory response = marketApiInstance
            .get_deal_client(params);
        return response.client;
    }

    /// @return the provider of a deal proposal for the requested data in the DAO.
    function getStorageDealProvider(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealProviderReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);
        MarketTypes.GetDealProviderParams memory params = MarketTypes
            .GetDealProviderParams(d_id);
        MarketTypes.GetDealProviderReturn memory response = marketApiInstance
            .get_deal_provider(params);
        return response;
    }

    /// @return the label of a deal proposal for the requested data in the DAO.
    function getStorageDealLabel(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealLabelReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);

        MarketTypes.GetDealLabelParams memory params = MarketTypes
            .GetDealLabelParams(d_id);

        MarketTypes.GetDealLabelReturn memory response = marketApiInstance
            .get_deal_label(params);
        return response;
    }

    /// @return the start epoch and duration of a deal proposal for the requested data in the DAO
    function getStorageDealTerm(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealTermReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);

        MarketTypes.GetDealTermParams memory params = MarketTypes
            .GetDealTermParams(d_id);

        MarketTypes.GetDealTermReturn memory response = marketApiInstance
            .get_deal_term(params);
        return response;
    }

    /// @return the per-epoch price of a deal proposal for the requested data in the DAO
    function getStorageDealTotalPrice(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealEpochPriceReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);

        MarketTypes.GetDealEpochPriceParams memory params = MarketTypes
            .GetDealEpochPriceParams(d_id);

        MarketTypes.GetDealEpochPriceReturn memory response = marketApiInstance
            .get_deal_total_price(params);
        return response;
    }

    /// @return the verified flag for a deal proposal for the requested data in the DAO
    function getStorageDealVerified(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealVerifiedReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);

        MarketTypes.GetDealVerifiedParams memory params = MarketTypes
            .GetDealVerifiedParams(d_id);

        MarketTypes.GetDealVerifiedReturn memory response = marketApiInstance
            .get_deal_verified(params);
        return response;
    }

    /// @return If the deal does not yet exist, return USR_NOT_FOUND; otherwise, return EX_DEAL_EXPIRED for the requested data in the DAO.
    function getStorageDealActivation(uint256 _id)
        public
        view
        returns (MarketTypes.GetDealActivationReturn memory)
    {
        uint64 d_id = dao.getDealId(_id);
        address d_address = dao.getDealAddress(_id);
        MarketAPI marketApiInstance = MarketAPI(d_address);

        MarketTypes.GetDealActivationParams memory params = MarketTypes
            .GetDealActivationParams(d_id);

        MarketTypes.GetDealActivationReturn memory response = marketApiInstance
            .get_deal_activation(params);
        return response;
    }
}
