class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :account, :login
end
