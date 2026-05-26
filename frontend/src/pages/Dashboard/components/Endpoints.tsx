import { EndpointDefinition } from '@multiversx/sdk-core/out/smartcontracts';
import { useSCExplorerContext } from '@multiversx/sdk-dapp-sc-explorer/contexts/SCExplorerContextProvider';
import { whitelistEndpoints } from 'config';
import { Endpoint } from './Endpoint';

export const Endpoints = () => {
  const { smartContract } = useSCExplorerContext();

  const endpoints = smartContract?.abiRegistry
    ?.endpoints as EndpointDefinition[];

  const hasEndpoints = endpoints?.length > 0;

  if (!hasEndpoints) {
    return null;
  }

  const filteredEndpoints =
    whitelistEndpoints?.length > 0
      ? whitelistEndpoints
          .map(({ name }) =>
            endpoints.find((endpoint) => endpoint.name === name)
          )
          .filter((endpoint) => endpoint != null)
      : endpoints;

  return (
    <div className='flex flex-col gap-6'>
      {filteredEndpoints.map((endpoint, index) => {
        return (
          <Endpoint key={`${endpoint.name}-${index}`} endpoint={endpoint} />
        );
      })}
    </div>
  );
};
