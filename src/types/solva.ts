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
          "name": "payer",
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
          "name": "signer",
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
          "name": "signer",
          "isMut": true,
          "isSigner": false,
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
          "name": "signer",
          "isMut": true,
          "isSigner": true,
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
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "indemniteeRecieveCompensation",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
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
          "name": "signer",
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
    },
    {
      "name": "expertGetIncome",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "platformCloseCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    }
  ],
  "metadata": {
    "address": "C5Va9W4xKoXrWFjAvMgToCQpHFTN9CcJXQTLFh7yk99C"
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
          "name": "payer",
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
          "name": "signer",
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
          "name": "signer",
          "isMut": true,
          "isSigner": false,
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
          "name": "signer",
          "isMut": true,
          "isSigner": true,
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
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "indemniteeRecieveCompensation",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
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
          "name": "signer",
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
    },
    {
      "name": "expertGetIncome",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    },
    {
      "name": "platformCloseCase",
      "accounts": [
        {
          "name": "dataAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true,
          "isOptional": false
        }
      ],
      "args": []
    }
  ],
  "metadata": {
    "address": "C5Va9W4xKoXrWFjAvMgToCQpHFTN9CcJXQTLFh7yk99C"
  }
};
