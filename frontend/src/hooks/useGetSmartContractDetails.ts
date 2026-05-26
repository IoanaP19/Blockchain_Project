import { useEffect, useState } from 'react';
import { AccountType } from '@multiversx/sdk-dapp/types';
import axios from 'axios';
import { contractAddress } from 'config';
import { useGetNetworkConfig } from 'hooks';

export const useGetSmartContractDetails = () => {
  const { network } = useGetNetworkConfig();

  const [smartContractDetails, setSmartContractDetails] =
    useState<AccountType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSmartContractDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${network.apiAddress}/accounts/${contractAddress}`
      );

      if (data) {
        setSmartContractDetails(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSmartContractDetails();
  }, []);

  return { smartContractDetails, getSmartContractDetails, isLoading };
};
