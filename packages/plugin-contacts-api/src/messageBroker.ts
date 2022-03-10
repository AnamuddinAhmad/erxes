import {
  findCompany,
  findCustomer,
  generateFields,
  getContentItem,
  prepareEngageCustomers
} from './utils';
import { serviceDiscovery } from './configs';
import { insertImportItems, prepareImportDocs } from './importUtils';
import { generateModels, connectCore } from './connectionResolver';

export let client;

export const initBroker = cl => {
  client = cl;

  const { consumeRPCQueue, consumeQueue } = client;

  consumeRPCQueue('contacts:rpc_queue:getCustomerName', async customer => {
    const { Customers } = await generateModels('os');
    return {
      data: await Customers.getCustomerName(customer),
      status: 'success'
    };
  });

  consumeRPCQueue('contacts:rpc_queue:findCustomer', async doc => {
    const models = await generateModels('os');
    return {
      status: 'success',
      data: await findCustomer(models, doc)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:findCompany', async doc => {
    const models = await generateModels('os');
    return {
      status: 'success',
      data: await findCompany(models, doc)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:getCustomers', async doc => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.find(doc)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:getCustomerIds', async selector => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.find(selector).distinct('_id')
    };
  });

  consumeRPCQueue(
    'contacts:rpc_queue:findActiveCustomers',
    async ({ selector, fields }) => {
      const { Customers } = await generateModels('os');
      return {
        status: 'success',
        data: await Customers.findActiveCustomers(selector, fields)
      };
    }
  );

  consumeRPCQueue(
    'contacts:Customers.findOne',
    async ({ selector, fields }) => {
      const { Customers } = await generateModels('os');
      return {
        status: 'success',
        data: await Customers.findOne(selector, fields).lean()
      };
    }
  );

  consumeRPCQueue(
    'contacts:rpc_queue:findActiveCompanies',
    async ({ selector, fields }) => {
      const { Companies } = await generateModels('os');
      return {
        status: 'success',
        data: await Companies.findActiveCompanies(selector, fields)
      };
    }
  );

  consumeRPCQueue('contacts:rpc_queue:create_customer', async data => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.createCustomer(data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:createCompany', async data => {
    const { Companies } = await generateModels('os');
    return {
      status: 'success',
      data: await Companies.createCompany(data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:updateCustomer', async ({ _id, doc }) => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.updateCustomer(_id, doc)
    };
  });

  consumeRPCQueue(
    'contacts:rpc_queue:updateCustomerCommon',
    async ({ selector, modifier }) => {
      const { Customers } = await generateModels('os');
      return {
        status: 'success',
        data: await Customers.updateOne(selector, modifier)
      };
    }
  );

  consumeQueue('contacts:removeCustomers', async doc => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.removeCustomers(doc)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:updateCompany', async ({ _id, doc }) => {
    const { Companies } = await generateModels('os');
    return {
      status: 'success',
      data: await Companies.updateCompany(_id, doc)
    };
  });

  consumeRPCQueue(
    'contacts:rpc_queue:updateCompanyCommon',
    async ({ selector, modifier }) => {
      const { Companies } = await generateModels('os');
      return {
        status: 'success',
        data: await Companies.updateOne(selector, modifier)
      };
    }
  );

  consumeRPCQueue('contacts:rpc_queue:getWidgetCustomer', async data => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.getWidgetCustomer(data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:updateMessengerCustomer', async data => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.updateMessengerCustomer(data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:createMessengerCustomer', async data => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.createMessengerCustomer(data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:saveVisitorContactInfo', async data => {
    const { Customers } = await generateModels('os');
    return {
      status: 'success',
      data: await Customers.saveVisitorContactInfo(data)
    };
  });

  consumeQueue(
    'contacts:updateLocation',
    async ({ customerId, browserInfo }) => {
      const { Customers } = await generateModels('os');
      Customers.updateLocation(customerId, browserInfo);
    }
  );

  consumeQueue('contacts:updateSession', async ({ customerId }) => {
    const { Customers } = await generateModels('os');
    Customers.updateSession(customerId);
  });

  consumeRPCQueue('contacts:rpc_queue:getFields', async args => {
    const models = await generateModels('os');
    return {
      status: 'success',
      data: await generateFields(models, args)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:prepareImportDocs', async args => {
    const coreModels = await connectCore();
    return {
      status: 'success',
      data: await prepareImportDocs(coreModels, args)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:insertImportItems', async args => {
    const models = await generateModels('os');
    return {
      status: 'success',
      data: await insertImportItems(models, args)
    };
  });

  consumeRPCQueue('contacts:getCustomerName', async customer => {
    const { Customers } = await generateModels('os');
    return { data: Customers.getCustomerName(customer), status: 'success' };
  });

  consumeRPCQueue('contacts:rpc_queue:getContentItem', async data => {
    const models = await generateModels('os');
    return {
      status: 'success',
      data: await getContentItem(models, data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:prepareEngageCustomers', async data => {
    const models = await generateModels('os');
    return {
      status: 'success',
      data: await prepareEngageCustomers(models, data)
    };
  });

  consumeRPCQueue('contacts:rpc_queue:tag', async args => {
    const { Companies, Customers } = await generateModels('os');

    let data = {};
    let model: any = Companies;

    if (args.type === 'customer') {
      model = Customers;
    }

    if (args.action === 'count') {
      data = await model.countDocuments({ tagIds: { $in: args._ids } });
    }

    if (args.action === 'tagObject') {
      await model.updateMany(
        { _id: { $in: args.targetIds } },
        { $set: { tagIds: args.tagIds } },
        { multi: true }
      );

      data = await model.find({ _id: { $in: args.targetIds } }).lean();
    }

    return {
      status: 'success',
      data
    };
  });

  consumeRPCQueue(
    'contacts:rpc_queue:generateInternalNoteNotif',
    async args => {
      const { contentTypeId, notifDoc, type } = args;

      const { Customers, Companies } = await generateModels('os');

      let model: any = Customers;
      let link = `/contacts/details/`;

      if (type === 'company') {
        model = Companies;
        link = `/companies/details/`;
      }

      const response = await model.findOne({ _id: contentTypeId });

      const name =
        type === 'customer'
          ? await Customers.getCustomerName(response)
          : await Companies.getCompanyName(response);

      notifDoc.notifType = `${type}Mention`;
      notifDoc.content = name;
      notifDoc.link = link + response._id;
      notifDoc.contentTypeId = response._id;
      notifDoc.contentType = `${type}`;

      return {
        status: 'success',
        data: notifDoc
      };
    }
  );
};

export const sendMessage = async (channel, message): Promise<any> => {
  return client.sendMessage(channel, message);
};

export const sendRPCMessage = async (channel, message): Promise<any> => {
  return client.sendRPCMessage(channel, message);
};

export const sendContactMessage = async (action, data): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('contacts'))) {
    return;
  }

  return client.sendMessage(`contacts:${action}`, data);
};

export const sendContactRPCMessage = async (action, data): Promise<any> => {
  return client.sendRPCMessage(`contacts:rpc_queue:${action}`, data);
};

export const sendFormRPCMessage = async (action, data): Promise<any> => {
  return client.sendRPCMessage(`forms:rpc_queue:${action}`, data);
};

export const sendConformityMessage = async (action, data): Promise<any> => {
  return client.sendRPCMessage(`conformities:${action}`, data);
};

export const sendEngageMessage = async (action, data): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('engages'))) {
    return null;
  }

  if (!(await serviceDiscovery.isAvailable('engages'))) {
    throw new Error('Engages service is not available.');
  }

  return client.sendRPCMessage(`engages:rpc_queue:${action}`, data);
};

export const prepareCustomFieldsData = async (doc): Promise<any> => {
  return client.sendRPCMessage('fields:rpc_queue:prepareCustomFieldsData', {
    doc
  });
};

export const generateCustomFieldsData = async (doc): Promise<any> => {
  return client.sendRPCMessage('fields:rpc_queue:generateCustomFieldsData', {
    doc
  });
};

export const sendFieldRPCMessage = async (action, data): Promise<any> => {
  return client.sendRPCMessage(`fields:rpc_queue:${action}`, data);
};

export const findIntegrations = async (query, options?): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('inbox'))) {
    return [];
  }

  if (!(await serviceDiscovery.isAvailable('inbox'))) {
    throw new Error('Inbox service is not available.');
  }

  return client.sendRPCMessage('inbox:rpc_queue:findIntegrations', {
    query,
    options
  });
};

export const findTags = async (query): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('tags'))) {
    return [];
  }

  if (!(await serviceDiscovery.isAvailable('tags'))) {
    throw new Error('Tags service is not available');
  }

  return client.sendRPCMessage('tags:rpc_queue:find', query);
};

export const findOneTag = async (query): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('tags'))) {
    return null;
  }

  if (!(await serviceDiscovery.isAvailable('tags'))) {
    throw new Error('Tags service is not available');
  }

  return client.sendRPCMessage('tags:rpc_queue:findOne', query);
};

export const createTag = async doc => {
  if (!(await serviceDiscovery.isEnabled('tags'))) {
    return null;
  }

  if (!(await serviceDiscovery.isAvailable('tags'))) {
    throw new Error('Tags service is not available');
  }

  return client.sendRPCMessage('tags:createTag', doc);
};

export const sendToLog = (channel: string, data) =>
  client.sendMessage(channel, data);

export const removeCustomersConversations = async (
  customerIds
): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('inbox'))) {
    return;
  }

  await client.sendMessage('inbox:removeCustomersConversations', {
    customerIds
  });
};

export const removeCustomersEngages = async (customerIds): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('engages'))) {
    return;
  }

  await client.sendMessage('engage:removeCustomersEngages', customerIds);
};

export const engageChangeCustomer = async (
  customerId,
  customerIds
): Promise<any> => {
  if (!(await serviceDiscovery.isEnabled('engages'))) {
    return;
  }

  return client.sendMessage('engage:changeCustomer', {
    customerId,
    customerIds
  });
};

export const fetchSegment = (segment, options?) =>
  sendSegmentMessage('fetchSegment', { segment, options }, true);

export const sendSegmentMessage = async (action, data, isRPC?: boolean) => {
  if (!isRPC) {
    return sendMessage(`segments:${action}`, data);
  }

  if (!(await serviceDiscovery.isAvailable('segments'))) {
    throw new Error('Segments service is not available');
  }

  sendMessage(`segments:rpc_queue:${action}`, data);
};

export const removeInternalNotes = async (
  contentType: string,
  contentTypeIds: string[]
) => {
  if (!(await serviceDiscovery.isEnabled('internalnotes'))) {
    return;
  }

  return sendMessage('internalnotes:InternalNotes.removeInternalNotes', {
    contentType,
    contentTypeIds
  });
};

export const internalNotesBatchUpdate = async (
  contentType: string,
  oldContentTypeIds: string[],
  newContentTypeId: string
) => {
  if (!(await serviceDiscovery.isEnabled('internalnotes'))) {
    return;
  }

  return sendMessage('internalNotes:batchUpdate', {
    contentType,
    oldContentTypeIds,
    newContentTypeId
  });
};

export const inboxChangeCustomer = async (
  customerId: string,
  customerIds: string[]
) => {
  if (!(await serviceDiscovery.isEnabled('inbox'))) {
    return;
  }

  return sendMessage('inbox:changeCustomer', { customerId, customerIds });
};

export default function() {
  return client;
}
