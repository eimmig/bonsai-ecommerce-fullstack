import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export interface CalculateShippingRequest {
  zipCodeOrigin: string;
  zipCodeDestination: string;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
}

export interface ShippingOption {
  name: string;
  price: number;
  deliveryTime: string;
  rawHtml?: string;
}

export interface ShippingResponse {
  options: ShippingOption[];
}

const parseShippingHtml = (html: string): ShippingOption[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const options: ShippingOption[] = [];

  const shippingDivs = doc.querySelectorAll('.js-list-results > div');

  shippingDivs.forEach((div) => {
    const nameElement = div.querySelector('.h5');
    const deliveryElement = div.querySelector('.shipping-info-left .info');
    const priceElement = div.querySelector('.shipping-info-right .info');

    if (nameElement && deliveryElement && priceElement) {
      const name = nameElement.textContent?.trim() || '';
      const deliveryTime = deliveryElement.textContent?.trim() || '';
      const priceText = priceElement.textContent?.trim() || '';
      
      const priceMatch = priceText.match(/R\$\s*([\d.,]+)/);
      const price = priceMatch 
        ? parseFloat(priceMatch[1].replace('.', '').replace(',', '.'))
        : 0;

      options.push({
        name,
        price,
        deliveryTime,
        rawHtml: div.outerHTML,
      });
    }
  });

  return options;
};

export const shippingApi = {
  calculate: async (data: CalculateShippingRequest): Promise<ShippingResponse> => {
    const requestBody = {
      zipCodeOrigin: data.zipCodeOrigin,
      zipCodeDestination: data.zipCodeDestination,
      width: (data.width || 50).toString(),
      height: (data.height || 50).toString(),
      depth: (data.depth || 16).toString(),
      weight: (data.weight || 4000).toString(),
    };

    const response = await apiClient.post<string>(
      ENDPOINTS.SHIPPING.CALCULATE,
      requestBody
    );

    const html = response.data;
    const options = parseShippingHtml(html);

    return { options };
  },
};
