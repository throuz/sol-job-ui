export type Solva = {
  "version": "0.0.1",
  "name": "solva",
  "instructions": [
    {
      "name": "new",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": [
        {
          "name": "platformpubkey",
          "type": "publicKey"
        },
        {
          "name": "clientpubkey",
          "type": "publicKey"
        },
        {
          "name": "caseamountlamports",
          "type": "u64"
        },
        {
          "name": "expertdepositlamports",
          "type": "u64"
        },
        {
          "name": "clientdepositlamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "expertCancelCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "clientActivateCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "client",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": [
        {
          "name": "clientdepositlamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "platformForceCloseCaseForExpert",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "platform",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "platformForceCloseCaseForClient",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "platform",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "client",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "clientCompleteCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "client",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": []
    }
  ],
  "metadata": {
    "address": "GuvvxMUBDziMyyB2fy7XoUy7cLE5mHQiBNwPzHHHDtSg"
  }
};

export const IDL: Solva = {
  "version": "0.0.1",
  "name": "solva",
  "instructions": [
    {
      "name": "new",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": [
        {
          "name": "platformpubkey",
          "type": "publicKey"
        },
        {
          "name": "clientpubkey",
          "type": "publicKey"
        },
        {
          "name": "caseamountlamports",
          "type": "u64"
        },
        {
          "name": "expertdepositlamports",
          "type": "u64"
        },
        {
          "name": "clientdepositlamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "expertCancelCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "clientActivateCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "client",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": [
        {
          "name": "clientdepositlamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "platformForceCloseCaseForExpert",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "platform",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "platformForceCloseCaseForClient",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "platform",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "client",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "clientCompleteCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "DA",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "expert",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "client",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": false
        }
      ],
      "args": []
    }
  ],
  "metadata": {
    "address": "GuvvxMUBDziMyyB2fy7XoUy7cLE5mHQiBNwPzHHHDtSg"
  }
};
