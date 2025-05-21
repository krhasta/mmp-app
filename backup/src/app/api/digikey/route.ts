import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/app/data-source';
import { Product } from '@/entity/product';
import { DataSource } from 'typeorm';

export async function GET(request: Request) {
  const tokenUrl = 'https://api.digikey.com/v1/oauth2/token';
  const clientId = process.env.DIGIKEY_CLIENT_ID;
  const clientSecret = process.env.DIGIKEY_CLIENT_SECRET;
  const grantType = 'client_credentials';

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing client credentials in environment variables' }, { status: 500 });
  }

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', grantType);

  try {
    // Fetch the token
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      return NextResponse.json({ error: 'Failed to fetch token', details: error }, { status: tokenResponse.status });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Extract productId from the request
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId in query parameters' }, { status: 400 });
    }

    // Fetch product details
    const productDetailsUrl = `https://api.digikey.com/products/v4/search/${productId}/productdetails`;
    const productResponse = await fetch(productDetailsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-DIGIKEY-Client-Id': clientId,
      },
    });

    if (!productResponse.ok) {
      const error = await productResponse.json();
      return NextResponse.json(
        { error: 'Failed to fetch product details', details: error },
        { status: productResponse.status }
      );
    }

    const productData = await productResponse.json();
    return NextResponse.json(productData);
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while processing the request', details: error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 클라이언트로부터 받은 JSON 데이터
    const body = await request.json();
    const {
      // Description,
      Manufacturer,
      ManufacturerProductNumber,
      UnitPrice,
      DatasheetUrl,
      QuantityAvailable,
      ProductStatus,
      Discontinued,
      EndOfLife,
      Parameters,
      Category,
      Series,
      Classifications,
    } = body.result.Product;

    const productData = body.result.Product

    const ProductDescription = productData.Product.Description.ProductDescription

    console.log(body);

    // 데이터베이스 초기화 (이미 초기화된 경우 이를 체크)
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const productRepository = AppDataSource.getRepository(Product);

    // 새 Product 인스턴스 생성 후 필드에 값 할당
    const product = new Product();
    product.description = Description;
    product.manufacturer = Manufacturer;
    product.manufacturerProductNumber = ManufacturerProductNumber;
    product.unitPrice = UnitPrice;
    product.datasheetUrl = DatasheetUrl;
    product.quantityAvailable = QuantityAvailable;
    product.productStatus = ProductStatus;
    product.discontinued = Discontinued;
    product.endOfLife = EndOfLife;
    product.parameters = Parameters;
    product.category = Category;
    product.series = Series;
    product.classifications = Classifications;

    // 데이터베이스에 저장
    await productRepository.save(product);

    return NextResponse.json({ message: 'Product saved successfully', product }, { status: 200 });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ message: 'Error saving product' }, { status: 500 });
  }
}
