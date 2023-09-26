import { GetQueryInterface } from 'interfaces';

export interface OptionChainAnalysisInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  strike_price: number;
  expiry_date: any;
  option_type?: string;
  last_traded_price?: number;
  volume_traded_today?: number;
  open_interest?: number;
  implied_volatility?: number;
  change_in_open_interest?: number;
  previous_day_volume?: number;
  historical_volatility?: number;
  delta?: number;
  greeks?: string;
  theta?: number;
  vega?: number;
  option_chain_timestamp: any;
  underlying_asset?: string;
  option_chain_analysis?: string;
  analysis_timestamp?: any;
  option_chain_trend?: string;
  option_chain_sentiment?: string;
  analysis_summary?: string;
  analysis_accuracy?: number;
  analysis_confidence_interval?: number;
  analysis_comments?: string;
  analysis_update_frequency?: string;
  option_chain_prediction?: number;

  _count?: {};
}

export interface OptionChainAnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  option_type?: string;
  greeks?: string;
  underlying_asset?: string;
  option_chain_analysis?: string;
  option_chain_trend?: string;
  option_chain_sentiment?: string;
  analysis_summary?: string;
  analysis_comments?: string;
  analysis_update_frequency?: string;
}
