import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
      }
    //   search(info) {
    //     info.isImportSupplier = true;
    //     let endpoint = `${serviceUri}`;
    //     return super.list(endpoint, info);
    //   }
    
    //   getXls(info) {
    //     let endpoint = `${serviceUri}/downloads/xls?billNo=${info.billNo}&paymentBill=${info.paymentBill}&category=${info.category}&startDate=${info.startDate}&endDate=${info.endDate}&isForeignCurrency=${false}&isImportSupplier=${true}`;
    //     return super.getXls(endpoint);
    //   }

    search(info) {
        var dummyData= [
            {
                "Index":1,
                "DispositionExpenditures":[
                    {
                        "BankExpenditureDate":"2021-04-26",
                        "BankExpenditureNo":"EXPEND001",
                        "DispositionNo":"D001",
                        "SupplierName":"Ini Supplier Name",
                        "DownPaymentDuration":54,
                        "InitialBalanceDispositionAmount":100000,
                        "InitialBalancePaymentAmount":2000000,
                        "InitialBalanceCurrencyRate":14000,
                        "InitialBalanceCurrencyAmount":300000,
                        "DownPaymentDispositionAmount":400000,
                        "DownPaymentDispositionPaymentAmount":500000,
                        "DownPaymentCurrencyRate":600000,
                        "DownPaymentCurrencyAmount":700000,
                        "LastBalanceCurrencyCode":"IDR",
                        "LastBalanceCurrencyRate":17000,
                        "LastBalanceCurrencyAmount":152345506
                    },
                    {
                        "BankExpenditureDate":"2021-04-26",
                        "BankExpenditureNo":"EXPEND001",
                        "DispositionNo":"D001",
                        "SupplierName":"Ini Supplier Name",
                        "DownPaymentDuration":54,
                        "InitialBalanceDispositionAmount":100000,
                        "InitialBalancePaymentAmount":2000000,
                        "InitialBalanceCurrencyRate":14000,
                        "InitialBalanceCurrencyAmount":300000,
                        "DownPaymentDispositionAmount":400000,
                        "DownPaymentDispositionPaymentAmount":500000,
                        "DownPaymentCurrencyRate":600000,
                        "DownPaymentCurrencyAmount":700000,
                        "LastBalanceCurrencyCode":"IDR",
                        "LastBalanceCurrencyRate":17000,
                        "LastBalanceCurrencyAmount":152345506
                    }
                ],
                "Memos":
                [
                    {
                        "MemoNo":"M001",
                        "MemoDate":"2021-02-02",
                        "RealizationDownPaymentCurrencyTotal":800000,
                        "RealizationDownPaymentCurrencyRate":900000,
                        "RealizationDownPaymentCurrencyAmount":2100000,
                        "InternNoteDate":"2021-02-03",
                        "InternNoteNo":"NI001",
                        "DeliveryOrderNo":"SJ002",
                        "PaymentNo":"BP001",
                        "PaymentDescription":"BP Desc",
                        "PaymentCurrencyCode":"IDR",
                        "PaymentCurrencyRate":15000,
                        "PaymentCurrencyAmount":22000000,
                        "DifferenceCurrencyRate":500,
                    },
                    {
                        "MemoNo":"M001",
                        "MemoDate":"2021-02-02",
                        "RealizationDownPaymentCurrencyTotal":800000,
                        "RealizationDownPaymentCurrencyRate":900000,
                        "RealizationDownPaymentCurrencyAmount":2100000,
                        "InternNoteDate":"2021-02-03",
                        "InternNoteNo":"NI001",
                        "DeliveryOrderNo":"SJ002",
                        "PaymentNo":"BP001",
                        "PaymentDescription":"BP Desc",
                        "PaymentCurrencyCode":"IDR",
                        "PaymentCurrencyRate":15000,
                        "PaymentCurrencyAmount":22000000,
                        "DifferenceCurrencyRate":500,
                    },
                    {
                        "MemoNo":"M001",
                        "MemoDate":"2021-02-02",
                        "RealizationDownPaymentCurrencyTotal":800000,
                        "RealizationDownPaymentCurrencyRate":900000,
                        "RealizationDownPaymentCurrencyAmount":2100000,
                        "InternNoteDate":"2021-02-03",
                        "InternNoteNo":"NI001",
                        "DeliveryOrderNo":"SJ002",
                        "PaymentNo":"BP001",
                        "PaymentDescription":"BP Desc",
                        "PaymentCurrencyCode":"IDR",
                        "PaymentCurrencyRate":15000,
                        "PaymentCurrencyAmount":22000000,
                        "DifferenceCurrencyRate":500,
                    },
                    {
                        "MemoNo":"M001",
                        "MemoDate":"2021-02-02",
                        "RealizationDownPaymentCurrencyTotal":800000,
                        "RealizationDownPaymentCurrencyRate":900000,
                        "RealizationDownPaymentCurrencyAmount":2100000,
                        "InternNoteDate":"2021-02-03",
                        "InternNoteNo":"NI001",
                        "DeliveryOrderNo":"SJ002",
                        "PaymentNo":"BP001",
                        "PaymentDescription":"BP Desc",
                        "PaymentCurrencyCode":"IDR",
                        "PaymentCurrencyRate":15000,
                        "PaymentCurrencyAmount":22000000,
                        "DifferenceCurrencyRate":500,
                    }
                ]
            }
        ];

        var response = {
            "apiVersion":"1.0.0",
            "data": dummyData,
            "info":{
                "count":25,
                "order":{
                    "LastModifiedUtc":"desc",
                },
                "page":1,
                "size":25,
                "total":149
            },
            "message":"Ok",
            "statusCode":200
        }
        return Promise.resolve(response);
      }
}