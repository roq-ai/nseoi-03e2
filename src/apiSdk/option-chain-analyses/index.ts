import axios from 'axios';
import queryString from 'query-string';
import { OptionChainAnalysisInterface, OptionChainAnalysisGetQueryInterface } from 'interfaces/option-chain-analysis';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOptionChainAnalyses = async (
  query?: OptionChainAnalysisGetQueryInterface,
): Promise<PaginatedInterface<OptionChainAnalysisInterface>> => {
  const response = await axios.get('/api/option-chain-analyses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createOptionChainAnalysis = async (optionChainAnalysis: OptionChainAnalysisInterface) => {
  const response = await axios.post('/api/option-chain-analyses', optionChainAnalysis);
  return response.data;
};

export const updateOptionChainAnalysisById = async (id: string, optionChainAnalysis: OptionChainAnalysisInterface) => {
  const response = await axios.put(`/api/option-chain-analyses/${id}`, optionChainAnalysis);
  return response.data;
};

export const getOptionChainAnalysisById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/option-chain-analyses/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteOptionChainAnalysisById = async (id: string) => {
  const response = await axios.delete(`/api/option-chain-analyses/${id}`);
  return response.data;
};
